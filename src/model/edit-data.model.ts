export class EditDataModel {
    constructor(
        public firstName: string | undefined,
        public lastName: string | undefined,
        public dateOfBirth: string | undefined,
        public email: string | undefined,
        public residence: string | undefined,
        public hometown: string | undefined,
        public workplace: string | undefined,
        //public relationShipStatus: string,
        public profileBio: string | undefined
    ) {
    }
}
