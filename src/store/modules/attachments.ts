import { getField, updateField } from 'vuex-map-fields';
import Attachment, { UploadAttachment } from '@/models/media/attachment';
import attachmentService from '@/services/attachmentService';
import { addErrorToast, addSuccessToast, CommitStateFunction } from '../common';

interface AttachmentState {
  isLoading: boolean;
  attachments: Attachment[];
  isUploading: boolean;
  upload: UploadAttachment;
}

const state: AttachmentState = {
  isLoading: false,
  attachments: [],
  isUploading: false,
  upload: new UploadAttachment(),
};

const getters = {
  getField,

  isLoading: (state: AttachmentState) => state.isLoading,
  isUploading: (state: AttachmentState) => state.isUploading,
  attachments: (state: AttachmentState) => state.attachments,
};

const mutations = {
  updateField,

  SET_IS_LOADING(state: AttachmentState, value: boolean): void {
    state.isLoading = value;
  },
  SET_IS_UPLOADING(state: AttachmentState, value: boolean): void {
    state.isUploading = value;
  },
  SET_ATTACHMENTS(state: AttachmentState, value: Attachment[]): void {
    state.attachments = value;
  },
  ADD_ATTACHMENT(state: AttachmentState, value: Attachment): void {
    state.attachments = [ ...state.attachments, value ];
  },
  RESET_UPLOAD(state: AttachmentState) {
    state.upload.file = null;
  },
};

const actions = {
  async loadAll({ commit }: { commit: any }): Promise<void> {
    commit('SET_IS_LOADING', true);

    try {
      const attachments = await attachmentService.getAll();
      commit('SET_ATTACHMENTS', attachments);
    } catch {
      addErrorToast('There was an error loading the attachments.');
    }

    commit('SET_IS_LOADING', false);
  },

  async searchAttachments({ commit }: { commit: any }, { objectType, objectId }): Promise<void> {
    commit('SET_IS_LOADING', true);

    try {
      const attachments = await attachmentService.search(objectType, objectId);
      commit('SET_ATTACHMENTS', attachments);
    } catch {
      addErrorToast('There was an error loading the attachments.');
    }

    commit('SET_IS_LOADING', false);
  },

  async upload({ commit, state }: CommitStateFunction<AttachmentState>) {
    try {
      commit('SET_IS_UPLOADING', true);

      // For now, not requiring that uploads are tied to a specific object (requirement, etc);
      const upload: UploadAttachment = { ...state.upload };
      upload.objectType = 'user';
      upload.objectId = 0;

      const newAttachment = await attachmentService.upload(upload);
      commit('ADD_ATTACHMENT', newAttachment);
      commit('RESET_UPLOAD');

      addSuccessToast('The attachment has been uploaded.');
    } catch (err) {
      console.log('upload err', err);

      addErrorToast('There was an error uploading the attachment. Try again.');
    }

    commit('SET_IS_UPLOADING', false);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
