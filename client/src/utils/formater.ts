const formartCPF = (cpf: string): string => {
    const newCPF = cpf.replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
    return newCPF;
}

const formatPhone = (phone: string): string => {
    const regex = /^([0-9]{2})([0-9]{4,5})([0-9]{4})$/;
    var str = phone.replace(/[^0-9]/g, "").slice(0, 11);
    const newPhone = str.replace(regex, "($1)$2-$3");
    return newPhone;
}

export {formartCPF, formatPhone};