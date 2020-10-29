// 필수는 아니지만 입력했을때 형식에 맞아야 되는 경우
// 특정 name은 무조건 체크함

// 들어왔을때 이 값이 필수 인지 체크
// 필수라면 isEmpty 적용

// 오류 메시지?
//

export const validateAll = (inputs, checkFunc) => {
    let isValid = false;
    let checkedErrors = {};

    Object.keys(inputs).forEach((key) => {
        if (checkFunc(key, inputs[key])) {
            checkedErrors[key] = checkFunc(key, inputs[key]);
        }
    });

    if (Object.keys(checkedErrors).length === 0) {
        isValid = true;
    }

    return { isValid, checkedErrors };
};

export const validateUser = (name, value) => {
    switch (name) {
        case "username":
            return isEmpty(value) && "이름을 입력해주세요.";

        case "id":
            return value.length < 4 && "5자 이상 입력해주세요";

        case "pw":
            return (
                checkRegPassword(value) &&
                "비밀번호는 8자이상이며 숫자, 영어, 특수문자가 포함되어야 합니다."
            );
        case "birthday":
            return isEmpty(value) && "생년월일을 선택해주세요.";

        case "telnumber":
            if (isEmpty(value)) return "전화번호를 입력해주세요.";
            if (checkNumber(value)) return "숫자만 입력 가능합니다.";
            return;

        case "nickname":
            return isEmpty(value) && "별명을 입력해주세요.";

        case "email":
            return checkEmail(value) && "이메일 형식에 맞게 작성해주세요.";

        default:
            return;
    }
};
export const validateLogin = (name, value) => {
    switch (name) {
        case "id":
            return value.length < 4 && "아이디는 5자 이상 입력해주세요";

        // case "password":
        //     return (
        //         checkRegPassword(value) &&
        //         "비밀번호는 8자이상이며 숫자, 영어, 특수문자가 포함되어야 합니다."
        //     );
        default:
            return;
    }
};

// ###
// email, id, pw
// const reqiredMap = {
//     user: ['username','id','pw','birthday', 'telnumber', 'nickname'],
//     driver: ['drivername','id','pw', 'birthday', 'telnumber'],
// }

export const validateDriver = (name, value) => {
    switch (name) {
        case "drivername":
            return isEmpty(value) && "이름을 입력해주세요.";

        case "id":
            return value.length < 4 && "5자 이상 입력해주세요";

        case "pw":
            return (
                checkRegPassword(value) &&
                "비밀번호는 8자이상이며 숫자, 영어, 특수문자가 포함되어야 합니다."
            );

        case "birthday":
            return isEmpty(value) && "생년월일을 선택해주세요.";

        case "telnumber":
            if (isEmpty(value)) return "전화번호를 입력해주세요.";
            if (checkNumber(value)) return "숫자만 입력 가능합니다.";
            return;

        default:
            return;
    }
};

export const validateManager = (name, value) => {
    switch (name) {
        case "username":
            return isEmpty(value) && "이름을 입력해주세요.";

        case "id":
            return value.length < 4 && "5자 이상 입력해주세요";

        case "pw":
            return (
                checkRegPassword(value) &&
                "비밀번호는 8자이상이며 숫자, 영어, 특수문자가 포함되어야 합니다."
            );
        case "level":
            return isEmpty(value) && "등급을 선택해주세요.";

        default:
            return;
    }
};

export const validatePackage = (name, value) => {
    switch (name) {
        case "tourname":
            return isEmpty(value) && "관광지명을 입력해주세요.";

        case "nationcodeidx":
        case "areacodeidx":
        case "tourcode":
        case "operatingtime":
            return isEmpty(value) && "선택해주세요";

        case "address":
            return isEmpty(value) && "주소를 입력해주세요.";

        //////////////
        case "telnumber":
        case "admissionfee":
            if (isEmpty(value)) return "입력해주세요.";
            if (checkNumber(value)) return "숫자만 입력 가능합니다.";
            return;

        default:
            return;
    }
};

export const validateNation = (name, value) => {
    switch (name) {
        case "koreanname":
            return isEmpty(value) && "국가한국이름을 입력해주세요.";

        case "englishname":
            return isEmpty(value) && "국가영어이름을 입력해주세요.";

        case "code3":
            return isEmpty(value) && "국가코드 3자리를 입력해주세요.";

        case "code2":
            return isEmpty(value) && "국가코드 2자리를 입력해주세요.";
        default:
            return;
    }
};

export const validateArea = (name, value) => {
    switch (name) {
        case "nationcodeidx":
            return isEmpty(value) && "국가코드를 선택해주세요.";

        case "sidocode":
        case "sidoname":
        case "areacode":
        case "areaname":
            return isEmpty(value) && "입력해주세요.";

        default:
            return;
    }
};

export const validateRegion = (name, value) => {
    switch (name) {
        case "country":
        case "city":
        case "state":
            return isEmpty(value) && "선택해주세요";

        default:
            return;
    }
};

export const validateInfo = (name, value) => {
    switch (name) {
        case "tourtype":
            return isEmpty(value) && "투어 종류를 선택해주세요.";

        case "touridx":
            return isEmpty(value) && "관광지코드를 입력해주세요.";

        case "tourdays":
            if (isEmpty(value)) return "투어 일수를 입력해주세요.";
            if (checkNumber(value)) return "숫자만 입력 가능합니다.";
            return;

        case "tourstartday":
            return isEmpty(value) && "관광지코드를 입력해주세요.";
        default:
            return;
    }
};

export const validateCode = (name, value) => {
    switch (name) {
        case "purchasedate":
            if (isEmpty(value)) return "구매일자를 선택해주세요";
            return;
        case "purchasetype":
            if (isEmpty(value)) return "구매방식을 선택해주세요";
            return;
        case "price":
            if (isEmpty(value)) return "금액을 입력해주세요.";
            if (checkNumber(value)) return "숫자만 입력 가능합니다.";
            return;
        case "purchaseuser":
            if (isEmpty(value)) return "구매자id를 입력해주세요";
            return;

        default:
            return;
    }
};

export const validatePush = (name, value) => {
    switch (name) {
        case "title":
        case "contents":
            if (isEmpty(value)) return "입력해주세요.";
            if (value.length > 50) return "50자까지 입력 가능합니다.";
            return;

        default:
            return;
    }
};

export const validateNotice = (name, value) => {
    switch (name) {
        case "title":
            return isEmpty(value) && "제목을 입력해주세요.";

        case "contents":
            return isEmpty(value) && "내용을 입력해주세요.";

        default:
            return;
    }
};

export const validateService = (name, value) => {
    switch (name) {
        case "title":
            return isEmpty(value) && "제목을 입력해주세요.";

        case "contactNumber":
            if (isEmpty(value)) return "전화번호를 입력해주세요.";
            if (checkNumber(value)) return "숫자만 입력 가능합니다.";
            return;

        case "sendEmail":
            if (isEmpty(value)) return "이메일을 입력해주세요.";
            if (checkEmail(value)) return "이메일 형식에 맞게 작성해주세요.";
            return;

        case "sendContent":
            return isEmpty(value) && "내용을 입력해주세요.";

        default:
            return;
    }
};

export const validateAudio = (name, value) => {
    switch (name) {
        default:
            return;
    }
};

export const isEmpty = (input) => {
    if (String(input).trim() === "") return true;
    else return false;
};

export const checkNumber = (input) => {
    const regexp = /^[0-9]*$/;
    if (!regexp.test(input)) return true;
    else return false;
};

// true 일때 에러 / false
export const checkEmail = (input) => {
    if (!input) return false;
    const regexp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (!regexp.test(input)) return true;
    else return false;
};

export const checkRegPassword = (password) => {
    const numbers = /[0-9]/;
    const spellings = /[a-zA-Z]/;
    const specialCharacters = /[~!@#$%&*]/;

    if (
        !numbers.test(password) ||
        !spellings.test(password) ||
        !specialCharacters.test(password) ||
        password.length < 8 ||
        password.length > 16
    ) {
        return true;
    } else {
        return false;
    }
};
