import RecordCompany from "../models/RecordCompany";

const checkRecordExists = async (email: string): Promise<boolean> => {

    const recordCompanyExists = await RecordCompany.findOne({email: email})

    const exists: boolean =  recordCompanyExists ? true : false

    return exists

}

export default checkRecordExists