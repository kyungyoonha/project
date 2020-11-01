import React, { useEffect } from "react";
import history from "../../../history";

// redux
import { useDispatch, useSelector } from "react-redux";
import {
    formAction_changeValue,
    formAction_init,
    formAction_initialize,
    formAction_submit,
} from "../../../redux/actions/formActions";
import { ContentBtn, ContentNav } from "../../../components/Content/Content";
import {
    FormLayout,
    FormSection,
    Input,
    RadioSingle,
    Textarea,
    InputDate,
    File222,
    SelectAPI,
} from "../../../components/Form/Form";

const initialValue = {
    drivername: "",
    id: "",
    pw: "",
    nationtype: "1",
    nationcodeidx: "1",
    areacodeidx: "",
    birthday: new Date("1990-01-01"),
    telnumber: "",
    cartype: "",
    carnumber: "",
    carlicense: "",
    businesstype: "1",
    grade: 0,
    etc: "",
    businessname: "",
    // image
    driver: "",
    license: "",
    car: "",
};

//working ###
const MemberFormDriver = ({ match }) => {
    const pageId = match.url.split("/")[2];
    const dispatch = useDispatch();
    const { inputs, errors } = useSelector((state) => state.form);

    useEffect(() => {
        dispatch(formAction_init(match.url, initialValue));
        return () => dispatch(formAction_initialize());
    }, [dispatch, match.url]);

    const handleChangeInputs = (e) => {
        dispatch(formAction_changeValue(e));
    };

    const handleClickInsert = (e) => {
        e.preventDefault();
        if (!inputs.license) {
            alert("면허증 이미지를 추가해주세요.");
            return;
        }
        dispatch(formAction_submit(["driver", "car", "license"]));
    };

    if (!Object.keys(inputs).length) return null;

    return (
        <FormLayout>
            <ContentNav pageId={pageId}>
                <ContentBtn
                    type="form"
                    handleClickInsert={handleClickInsert}
                    handleClickDelete={() => history.goBack()}
                />
            </ContentNav>
            <FormSection>
                <Input
                    label="이름"
                    name="drivername"
                    value={inputs.drivername}
                    onChange={handleChangeInputs}
                    errors={errors}
                />
                <Input
                    label="아이디"
                    name="id"
                    value={inputs.id}
                    onChange={handleChangeInputs}
                    errors={errors}
                />
                <Input
                    label="비밀번호"
                    type="password"
                    name="pw"
                    value={inputs.pw}
                    onChange={handleChangeInputs}
                    errors={errors}
                />
                <RadioSingle
                    label="국가 분류"
                    name="nationtype"
                    value={inputs.nationtype || "1"}
                    onChange={handleChangeInputs}
                    options={[
                        { value: "1", title: "국내" },
                        { value: "2", title: "국외" },
                    ]}
                />
                <SelectAPI
                    label="국가 코드"
                    searchId="nationcode"
                    value={inputs.nationcodeidx}
                    searchItems={["koreanname", "code2"]}
                    onChange={handleChangeInputs}
                    disabled={inputs.nationtype === "1"}
                    error={errors["nationcodeidx"]}
                />

                <SelectAPI
                    label="시도 코드"
                    searchId="areacode"
                    value={inputs.areacodeidx}
                    searchItems={[
                        "sidoname",
                        "sidocode",
                        "areaname",
                        "areacode",
                    ]}
                    onChange={handleChangeInputs}
                    error={errors["areacodeidx"]}
                />
                <InputDate
                    label="생년월일"
                    name="birthday"
                    value={inputs.birthday}
                    onChange={handleChangeInputs}
                    errors={errors}
                />
                <Input
                    label="전화번호"
                    name="telnumber"
                    value={inputs.telnumber}
                    onChange={handleChangeInputs}
                    errors={errors}
                />
                <Input
                    label="차종"
                    name="cartype"
                    value={inputs.cartype}
                    onChange={handleChangeInputs}
                />
                <Input
                    label="차량번호"
                    name="carnumber"
                    value={inputs.carnumber}
                    onChange={handleChangeInputs}
                />
                <Input
                    label="면허증 번호"
                    name="carlicense"
                    value={inputs.carlicense}
                    onChange={handleChangeInputs}
                    errors={errors}
                />
                <RadioSingle
                    label="소속"
                    name="businesstype"
                    value={inputs.businesstype}
                    onChange={handleChangeInputs}
                    options={[
                        { value: "1", title: "개인" },
                        { value: "2", title: "사업자" },
                    ]}
                />
                <Input
                    label="회사명"
                    name="businessname"
                    value={inputs.businessname}
                    onChange={handleChangeInputs}
                    errors={errors}
                />

                <Input
                    label="평점"
                    name="grade"
                    value={inputs.grade}
                    onChange={handleChangeInputs}
                    errors={errors}
                />
                <Textarea
                    label="기타"
                    name="etc"
                    value={inputs.etc}
                    onChange={handleChangeInputs}
                    rows={6}
                />
            </FormSection>
            <FormSection>
                <File222
                    label="기사 사진"
                    name="driver"
                    value={inputs.driver}
                    onChange={handleChangeInputs}
                    filetype="image"
                />
                <File222
                    label="면허증 사진"
                    name="license"
                    value={inputs.license}
                    onChange={handleChangeInputs}
                    filetype="image"
                />
                <File222
                    label="차량 사진"
                    name="car"
                    value={inputs.car}
                    onChange={handleChangeInputs}
                    filetype="image"
                />
            </FormSection>
        </FormLayout>
    );
};

export default MemberFormDriver;
