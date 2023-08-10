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

const removeNotNumber = (data: string) => {
    const newData = data.replace(/\D/g, '');
    return newData;
}

const formartDateBr = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleString('pt-BR', { timeZone: 'UTC', day: '2-digit', month: '2-digit', year: 'numeric' })
}

export {formartCPF, formatPhone, removeNotNumber, formartDateBr};