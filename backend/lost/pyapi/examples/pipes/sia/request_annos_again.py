from lost.pyapi import script
import os
from lost_ds import LOSTDataset

ENVS = ['lost']
ARGUMENTS = {
            'img_path_key' : { 'value':'img_path',
                            'help': 'Name of Column that should be used im img_path'},
            'ignore_lbls' : { 'value':'[]',
                            'help': 'List of labels to ignore for annotation request'},
            'remap_path' : { 'value':'-',
                            'help': 'If not *-*, remap img path to remap_path'},
            'anno_meta_keys' : { 'value':'[]',
                            'help': 'If not *-*, use row content of meta keys as meta information'},
            'img_meta_keys' : { 'value':'[]',
                            'help': 'If not *-*, use row content of meta keys as meta information'}
            }

class LostScript(script.Script):
    '''Request annotations for each image of an imageset.

    An imageset is basicly a folder with images.
    '''
    def main(self):
        for ds in self.inp.datasources:
            anno_file_path = ds.path
            fm = ds.get_fm()
            lds = LOSTDataset(anno_file_path)
            # if self.get_arg('img_path_key') is not None:
            #     # lds.df.drop(columns=['img_path'], inplace=True)
            #     lds.df.rename(columns={'img_path':'o_img_path'}, inplace=True)
            #     lds.df.rename(columns={self.get_arg('img_path_key'):'img_path'}, inplace=True)
            if self.get_arg('ignore_lbls') is not None:
                lds.ignore_labels(self.get_arg('ignore_lbls'), col='anno_lbl', inplace=True)
            if self.get_arg('remap_path') is not None:
                lds.remap_img_path(self.get_arg('remap_path'), inplace=True)
            if self.get_arg('anno_meta_keys') is None:
                anno_meta_keys = []
            else:
                anno_meta_keys = self.get_arg('anno_meta_keys')
            if self.get_arg('img_meta_keys') is None:
                img_meta_keys = []
            else:
                img_meta_keys = self.get_arg('img_meta_keys')
            self.outp.request_lds_annos(lds, fm, anno_meta_keys, img_meta_keys, self.get_arg('img_path_key'))

if __name__ == "__main__":
    my_script = LostScript() 
