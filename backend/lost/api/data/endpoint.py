from typing import BinaryIO
from sqlalchemy import engine
from sqlalchemy.sql.schema import DEFAULT_NAMING_CONVENTION
from flask_restx import Resource, fields
from flask import request, send_from_directory, make_response
from flask_jwt_extended import jwt_required, get_jwt_identity
from lost.api.api import api
from lost.settings import LOST_CONFIG, FLASK_DEBUG
from lost.db import access, roles
from lost.api.annotasks.parsers import annotask_parser
from lost.logic import anno_task as annotask_service
from lost.logic.file_man import AppFileMan, FileMan
from lost.logic import dask_session
from lost.pyapi.utils import anno_helper
from lost.logic.file_access import UserFileAccess
import json
import os
from lost.pyapi import pe_base
from io import BytesIO
import lost_ds as lds
import numpy as np
import cv2
import base64 
import random
namespace = api.namespace('data', description='Data API.')

@namespace.route('/<string:path>')
@api.doc(security='apikey')
class Data(Resource): 
    @jwt_required 
    def get(self, path):
        dbm = access.DBMan(LOST_CONFIG)
        identity = get_jwt_identity()
        user = dbm.get_user_by_id(identity)
        if not user.has_role(roles.ANNOTATOR):
            dbm.close_session()
            return "You are not authorized.", 401
        else:
            raise Exception('data/ -> Not Implemented!')
            # return send_from_directory(os.path.join(LOST_CONFIG.project_path, 'data'), path)

# @namespace.route('/logs/<path:path>')
# class Logs(Resource): 
#     @jwt_required 
#     def get(self, path):
#         print(path)
#         dbm = access.DBMan(LOST_CONFIG)
#         identity = get_jwt_identity()
#         user = dbm.get_user_by_id(identity)
#         if not user.has_role(roles.ANNOTATOR):
#             dbm.close_session()
#             return "You are not authorized.", 401
#         else:
#             # raise Exception('data/logs/ -> Not Implemented!')
#             fm = FileMan(LOST_CONFIG)
#             with fm.fs.open(fm.get_abs_path(path), 'rb') as f:
#                 resp = make_response(f.read())
#                 resp.headers["Content-Disposition"] = "attachment; filename=log.csv"
#                 resp.headers["Content-Type"] = "text/csv"
#             return resp

#             # return send_from_directory(os.path.join(LOST_CONFIG.project_path, 'data/logs'), path)

@namespace.route('/logs/<int:pe_id>')
#@namespace.param('path', 'Path to logfile')
@api.doc(security='apikey')
class Logs(Resource):
    @jwt_required 
    def get(self, pe_id):
        dbm = access.DBMan(LOST_CONFIG)
        identity = get_jwt_identity()
        user = dbm.get_user_by_id(identity)
        if not user.has_role(roles.ANNOTATOR):
            dbm.close_session()
            return "You are not authorized.", 401
        else:
            user_fs = dbm.get_user_default_fs(user.idx)
            ufa = UserFileAccess(dbm, user, user_fs)           
            resp = make_response(ufa.get_pipe_log_file(pe_id))
            resp.headers["Content-Disposition"] = "attachment; filename=log.csv"
            resp.headers["Content-Type"] = "text/csv"
            return resp

@namespace.route('/dataexport/<deid>')
#@namespace.param('path', 'Path to logfile')
@api.doc(security='apikey')
class DataExport(Resource):
    @jwt_required 
    def get(self, deid):
        dbm = access.DBMan(LOST_CONFIG)
        identity = get_jwt_identity()
        user = dbm.get_user_by_id(identity)
        if not user.has_role(roles.DESIGNER):
            dbm.close_session()
            return "You are not authorized.", 401
        else:
            # data = json.loads(request.data)
            de = dbm.get_data_export(deid)
            fs_db = de.fs
            fm = FileMan(fs_db=fs_db)
            with fm.fs.open(de.file_path, 'rb') as f:
                resp = make_response(f.read())
                resp.headers["Content-Disposition"] = "attachment; filename=annos.parquet"
                resp.headers["Content-Type"] = "blob"
            return resp

@namespace.route('/annoexport_parquet/<peid>')
@api.doc(security='apikey')
class AnnoExportParquet(Resource):
    @jwt_required 
    def get(self, peid):
         dbm = access.DBMan(LOST_CONFIG)
         identity = get_jwt_identity()
         user = dbm.get_user_by_id(identity)
         if not user.has_role(roles.DESIGNER):
             dbm.close_session()
             return "You are not authorized.", 401
         else:
             pe_db = dbm.get_pipe_element(pipe_e_id=peid)
             pe = pe_base.Element(pe_db, dbm)
             df = pe.inp.to_df()
             # raise Exception('GO ON HERE !!!')
             f = BytesIO()
             df.to_parquet(f)
             f.seek(0)
             resp = make_response(f.read())
             resp.headers["Content-Disposition"] = "attachment; filename=annos.parquet"
             resp.headers["Content-Type"] = "blob"
             return resp

@namespace.route('/annoexport_csv/<peid>')
@api.doc(security='apikey')
class AnnoExportCSV(Resource):
    @jwt_required 
    def get(self, peid):
         dbm = access.DBMan(LOST_CONFIG)
         identity = get_jwt_identity()
         user = dbm.get_user_by_id(identity)
         if not user.has_role(roles.DESIGNER):
             dbm.close_session()
             return "You are not authorized.", 401
         else:
             pe_db = dbm.get_pipe_element(pipe_e_id=peid)
             pe = pe_base.Element(pe_db, dbm)
             df = pe.inp.to_df()
             # raise Exception('GO ON HERE !!!')
             f = BytesIO()
             df.to_csv(f)
             f.seek(0)
             resp = make_response(f.read())
             resp.headers["Content-Disposition"] = "attachment; filename=annos.csv"
             resp.headers["Content-Type"] = "blob"
             return resp
@namespace.route('/workerlogs/<int:worker_id>')
@api.doc(security='apikey')
class Logs(Resource): 
    @jwt_required 
    def get(self, worker_id):
        dbm = access.DBMan(LOST_CONFIG)
        identity = get_jwt_identity()
        user = dbm.get_user_by_id(identity)
        if not user.has_role(roles.ADMINISTRATOR):
            dbm.close_session()
            return "You are not authorized.", 401
        else:
            raise Exception('data/workerlogs/ -> Not Implemented!')
            # fm = AppFileMan(LOST_CONFIG)
            # ufa = UserFileAccess(dbm, user, user_fs)           
            # resp = make_response(ufa.get_pipe_log_file(pe_id))
            # resp.headers["Content-Disposition"] = "attachment; filename=log.csv"
            # resp.headers["Content-Type"] = "text/csv"
            # return resp


def load_img(db_img, ufa, user):
    if LOST_CONFIG.worker_management != 'dynamic':
        # need to execute ls for s3fs (don't know why)
        try:
            ufa.fs.ls(db_img.img_path)
        except:
            pass
        img = ufa.load_anno_img(db_img)
    else:
        # TODO: Use UserFileAccess to load image
        img = dask_session.ds_man.read_fs_img(user, db_img.fs, db_img.img_path)
    return img

@namespace.route('/getImage')
@api.doc(security='apikey')
class GetImage(Resource):

    @jwt_required 
    def post(self):
        dbm = access.DBMan(LOST_CONFIG)
        identity = get_jwt_identity()
        user = dbm.get_user_by_id(identity)
        if not user.has_role(roles.ANNOTATOR):
            dbm.close_session()
            return "You need to be {} in order to perform this request.".format(roles.ANNOTATOR), 401

        else:
            #flask.current_app.logger.info('mia -> getimage. Received data: {}'.format(data))
            data = json.loads(request.data)
            # TODO: get db_img via db access
            if data['type'] == 'imageBased':
                db_img = dbm.get_image_anno(data['id'])
                ufa = UserFileAccess(dbm, user, db_img.fs)
                img = load_img(db_img, ufa, user)
            elif data['type'] == 'annoBased':
                db_anno = dbm.get_two_d_anno(two_d_anno_id=data['id'])
                db_img = dbm.get_image_anno(db_anno.img_anno_id)
                ufa = UserFileAccess(dbm, user, db_img.fs)
                # image = fm.load_img(db_img.img_path)
                image = load_img(db_img, ufa, user)
                img_h = image.shape[0]
                img_w = image.shape[1]
                
                # get annotation_task config
                draw_anno = False
                context = 0.0
                try:
                    draw_anno = data['drawAnno']
                except:
                    pass
                try:
                    context = float(data['addContext'])
                except:
                    pass
                
                df = db_img.to_df()
                df = df[df['anno_uid'] == db_anno.idx]
                ds = lds.LOSTDataset(df, filesystem=ufa.fs)
                # ds.to_abs(inplace=True)
                if draw_anno:
                    # img = lds.vis_sample(image, ds.df, lbl_col=None)
                    img = lds.vis_sample(image, ds.df, lbl_col=None, line_thickness=1)
                else:
                    img = image
                anno = ds.df['anno_data'].iloc[0]
                # to_abs
                anno = anno * [img_w, img_h]
                my_min = anno.min(axis=0).astype(int)
                my_max = anno.max(axis=0).astype(int)
                if context == 0:
                    img = img[my_min[1]:my_max[1], my_min[0]:my_max[0]]
                else:
                    anno_w = my_max[0] - my_min[0]
                    anno_h = my_max[1] - my_min[1]
                    x_cont = int((anno_w)*context/2)
                    y_cont = int((anno_h)*context/2)

                    x_min = max(0, my_min[0]-x_cont)
                    y_min = max(0, my_min[1]-y_cont)
                    x_max = min(img_w, my_max[0]+x_cont)
                    y_max = min(img_h, my_max[1]+y_cont)

                    print(f'x_con: {x_cont}, y_con: {y_cont}, anno_w: {anno_w}, anno_h: {anno_h}, img_w: {img_w}, img_h: {img_h}')
                    print(f'x_min: {x_min}, x_max: {x_max}, y_min: {y_min}, y_max: {y_max}')

                    img = img[y_min:y_max, x_min:x_max]
            else:
                raise Exception('Unknown mia image type')
            _, data = cv2.imencode('.jpg', img)
            data64 = base64.b64encode(data.tobytes())
            dbm.close_session()
            return u'data:img/jpg;base64,'+data64.decode('utf-8')
        
@namespace.route('/datastoresKey')
@api.doc(security='apikey')
@api.response(200, 'success', api.model('DatastoreKeys', {
    "1": fields.String(description="Name of datastore", example="Default Datastore")
}))
class GetDatastoresByKey(Resource):
    @jwt_required
    def get(self):
        return {    
            1: "Datastore 1",
            2: "Datastore 2",
            3: "Datastore 3",
            4: "Datastore 4",
            5: "Datastore 5"
        }
