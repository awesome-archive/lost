import pytest
from lost.db import model, dtype
from lost.db.access import DBMan
from lost.logic import config
import json
import datetime
from lost.utils import testils

REF_BBOX = [0.1, 0.1, 0.2, 0.2]
REF_POINT = [0.1, 0.1]
REF_LINE = [[0.1,0.1],[0.2,0.2]]
REF_POLYGON = [[0.1,0.1],[0.2,0.1],[0.15,0.2]]


def check_bbox(ref, to_check):
    '''Check if two boxes are equal'''
    for i, r in enumerate(ref):
        if r != to_check[i]:
            return False
    return True

@pytest.fixture
def full_img_anno():
    dbm = DBMan(config.LOSTConfig())
    test_user = testils.get_user(dbm)
    tree = testils.get_voc_label_tree(dbm)
    label_vec = tree.get_child_vec(tree.root.idx)
    twod_anno = model.TwoDAnno(
        data=json.dumps(
            {
                'x':REF_BBOX[0],
                'y':REF_BBOX[1],
                'w':REF_BBOX[2],
                'h':REF_BBOX[3]
            }
        ),
        dtype=dtype.TwoDAnno.BBOX,
        label_leaf_id=label_vec[0]
    )
    twod_anno.annotator = test_user
    twod_anno2 = model.TwoDAnno(
        data=json.dumps(
            {
                'x':REF_POINT[0],
                'y':REF_POINT[1]
            }
        ),
        dtype=dtype.TwoDAnno.POINT,
        label_leaf_id=label_vec[1]
    )
    twod_anno2.annotator = test_user
    line = model.TwoDAnno(
        label_leaf_id=label_vec[4]
    )
    line.annotator = test_user
    line.line = REF_LINE
    img_anno = model.ImageAnno(label_leaf_id=label_vec[3],
        img_path='path/to/img1.jpg')
    img_anno.twod_annos.append(twod_anno)
    img_anno.twod_annos.append(twod_anno2)
    img_anno.twod_annos.append(line)
    dbm.add(img_anno)
    dbm.add(twod_anno)
    dbm.commit()
    yield img_anno
    dbm.delete(twod_anno.label)
    dbm.delete(twod_anno)
    dbm.delete(twod_anno2.label)
    dbm.delete(twod_anno2)
    dbm.delete(img_anno.label)
    dbm.delete(img_anno)
    dbm.commit()

@pytest.fixture
def empty_img_anno():
    dbm = DBMan(config.LOSTConfig())
    test_user = testils.get_user(dbm)
    tree = testils.get_voc_label_tree(dbm)
    label_leaf_id = tree.get_child_vec(tree.root.idx)[0]
    img_anno = model.ImageAnno(img_path='path/to/img1.jpg')
    dbm.add(img_anno)
    dbm.commit()
    yield img_anno
    dbm.delete(img_anno)
    dbm.commit()

class TestImageAnnos(object):
    
    def test_to_dict_flat(self, full_img_anno):
        my_dict = full_img_anno.to_dict()[0]
        bbox = full_img_anno.twod_annos[0]
        assert my_dict['anno.data'] == bbox.data
        assert my_dict['anno.lbl.name'] == bbox.label.label_leaf.name
        assert my_dict['anno.lbl.idx'] == bbox.label.label_leaf.idx
        assert my_dict['anno.lbl.external_id'] == bbox.label.label_leaf.external_id
        assert my_dict['img.img_path'] == full_img_anno.img_path
        assert my_dict['img.lbl.idx'] == full_img_anno.label.label_leaf.idx
        # print(full_img_anno.to_dict()[0].keys())
        # for d in full_img_anno.to_dict():
        #      print(d['img.img_path'], d['anno.lbl.name'], d['anno.dtype'])
        # assert False

    def test_to_dict_hierarchical(self, full_img_anno):
        img_dict = full_img_anno.to_dict(style='hierarchical')
        bbox = full_img_anno.twod_annos[0]
        bbox_dict = img_dict['img.twod_annos'][0]
        print(img_dict)
        assert bbox_dict['anno.lbl.name'] == bbox.label.label_leaf.name
        assert bbox_dict['anno.lbl.idx'] == bbox.label.label_leaf.idx
        assert bbox_dict['anno.lbl.external_id'] == bbox.label.label_leaf.external_id
        assert bbox_dict['anno.data']['x'] == REF_BBOX[0]
        assert bbox_dict['anno.data']['y'] == REF_BBOX[1]
        assert bbox_dict['anno.data']['w'] == REF_BBOX[2]
        assert bbox_dict['anno.data']['h'] == REF_BBOX[3]
        assert img_dict['img.img_path'] == full_img_anno.img_path
        assert img_dict['img.lbl.idx'] == full_img_anno.label.label_leaf.idx
        
        # h_dict = full_img_anno.to_dict(style='hierarchical')
        # print(h_dict.keys())
        # print(h_dict['img.twod_annos'][0].keys())
        # for d in h_dict['img.twod_annos']:
        #     print(h_dict['img.img_path'], d['anno.lbl.name'], d['anno.dtype'])
        # assert False

    def test_to_vec(self, full_img_anno):
        img_anno = full_img_anno
        bbox = full_img_anno.twod_annos[0]
        assert check_bbox(REF_BBOX, img_anno.to_vec('anno.data')[0])
        assert img_anno.to_vec('anno.lbl.idx')[0] == bbox.label.label_leaf_id
        vec = img_anno.to_vec(['anno.lbl.name','anno.lbl.idx', 'anno.lbl.external_id'])[0]
        assert vec[0] == bbox.label.label_leaf.name
        assert vec[1] == bbox.label.label_leaf.idx
        assert vec[2] == bbox.label.label_leaf.external_id

        vec = img_anno.to_vec(['img.lbl.name','img.lbl.idx', 
            'img.lbl.external_id', 'img.img_path'])[0]
        assert vec[0] == img_anno.label.label_leaf.name
        assert vec[1] == img_anno.label.label_leaf.idx
        assert vec[2] == img_anno.label.label_leaf.external_id
        assert vec[3] == img_anno.img_path

        # print(img_anno.to_vec('anno.lbl.name'))
        # print(img_anno.to_vec(['img.img_path', 'anno.lbl.name', 'anno.data', 'anno.dtype']))
        # assert False
        
    def test_to_vec_empty_image(self, empty_img_anno):
        img_anno = empty_img_anno

        vec = img_anno.to_vec(['anno.lbl.name','anno.lbl.idx', 'anno.lbl.external_id'])[0]
        print(vec)
        assert vec[0] == None
        assert vec[1] == None
        assert vec[2] == None

        vec2 = img_anno.to_vec(['img.lbl.name','img.lbl.idx', 
            'img.lbl.external_id', 'img.img_path'])[0]
        print(vec2)
        assert vec2[0] == None
        assert vec2[1] == None
        assert vec2[2] == None
        assert vec2[3] == img_anno.img_path