import Constant from '../Constant';

export default {
    [Constant.CHANGE_ISLOADING]: (state, payload) => {
        state.isloading = payload.isloading;
    },
    [Constant.FETCH_CONTACTS]: (state, payload) => {
        state.contactlist = payload.contactlist;
    },
    [Constant.FETCH_CONTACT_ONE]: (state, payload) => {
        state.contact = payload.contact;
    },
    [Constant.INITIALIZE_CONTACT_ONE]: (state, payload) => {
        state.contact = { no: '', name: '', tel: '', address: '', photo: '' }
        console.log(payload);
    }
}