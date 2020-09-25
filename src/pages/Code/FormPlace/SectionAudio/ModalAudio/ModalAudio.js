import React, { useState, useRef, useEffect } from "react";

import styled from "styled-components";
import {
    RatioSingle,
    Select,
    Input,
    FileuploadCard,
} from "../../../../../components/common/Form/FormComponents";

import FormTable from "../../../../../components/common/Form/FormTable";
import Modal from "../../../../../components/common/Modal/Modal";
import noImg from "../../../../../img/no-img.jpg";
import {
    optionsCountry,
    optionsCity,
    optionsRegion,
} from "../../../../../util/options";
import SectionMain from "../../SectionMain/SectionMain";

const ContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 0px;
    height: 700px;

    .top {
        padding-right: 30px;

        button {
            float: right;
            margin-right: 20px;
            margin-bottom: 20px;
            width: 120px;
        }
    }
`;

const ModalAudio = ({
    isModalOpen,
    handleModalClose,
    handleChangeAudioList,
}) => {
    const [errors, setErrors] = useState({});
    const [inputs, setInputs] = useState({
        countryCtg: "KOREA",
        state: "",
        city: "",
        place: "",
        name: "",
        content: "",
        hasAudio: "no",
    });
    const [imageList, setImageList] = useState([]);
    const [audioMain, setAudioMain] = useState({
        korea: { title: "", script: "", files: [] },
        english: { title: "", script: "", files: [] },
        japan: { title: "", script: "", files: [] },
        china: { title: "", script: "", files: [] },
    });

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setInputs((state) => ({
            ...state,
            [name]: value,
        }));
    };

    const handleChangeAudioMain = ({ selected, name, value }) => {
        setAudioMain((state) => ({
            ...state,
            [selected]: {
                ...state[selected],
                [name]: value,
            },
        }));
    };

    const handleChangeImageList = (e) => {
        const files = e.target.files;
        const filesList = [...new Array(files.length)].map((_, i) => {
            return {
                src: URL.createObjectURL(files[i]),
                file: files[i],
                filename: files[i].name,
            };
        });
        const newImageList = [...imageList].concat(filesList);
        setImageList(newImageList);
    };

    //  {
    //     name: ''
    //     inputs: { countryCtg: "KOREA", state: "", city: "", place: "", name: "", content: "", hasAudio: "no" },
    //     imageList: [
    //         { src: "img1", filename: "", file: null }
    //     ],
    //     audioMain: {
    //         korea: { title: "", script: "", files: [] },
    //         english: { title: "", script: "", files: [] },
    //         japan: { title: "", script: "", files: [] },
    //         china: { title: "", script: "", files: [] },
    //     },
    // },
    const handleClickSave = () => {
        handleChangeAudioList({
            inputs,
            imageList,
            audioMain,
        });

        handleModalClose();
    };

    return (
        <Modal
            isModalOpen={isModalOpen}
            title="세부 관광지 추가하기"
            handleModalClose={handleModalClose}
        >
            <ContainerStyled>
                <div className="top">
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={handleClickSave}
                    >
                        저장
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={handleModalClose}
                    >
                        닫기
                    </button>
                </div>
                <div className=" row">
                    <FormTable size="half">
                        <RatioSingle
                            label="국가"
                            name="countryCtg"
                            value={inputs.countryCtg}
                            onChange={handleChangeInput}
                            options={[
                                { value: "KOREA", title: "국내" },
                                { value: "OVERSEAS", title: "국외" },
                            ]}
                        />
                        {inputs.countryCtg !== "KOREA" && (
                            <Select
                                label=""
                                name="country"
                                value={inputs.country}
                                onChange={handleChangeInput}
                                errors={errors}
                                options={optionsCountry(inputs.countryCtg)}
                            />
                        )}
                        <Select
                            label="시/도"
                            name="state"
                            value={inputs.state}
                            onChange={handleChangeInput}
                            errors={errors}
                            options={optionsCity(inputs.state)}
                        />
                        <Select
                            label="지역"
                            name="city"
                            value={inputs.city}
                            onChange={handleChangeInput}
                            errors={errors}
                            options={optionsRegion(inputs.region)}
                        />

                        <Select
                            label="관광지"
                            name="place"
                            value={inputs.place}
                            onChange={handleChangeInput}
                            errors={errors}
                            options={optionsRegion(inputs.region)}
                        />

                        <Input
                            label="이름"
                            name="name"
                            value={inputs.name}
                            onChange={handleChangeInput}
                            errors={errors}
                        />

                        <Input
                            label="한줄 소개"
                            name="content"
                            value={inputs.content}
                            onChange={handleChangeInput}
                            errors={errors}
                        />
                    </FormTable>
                    <FormTable size="half">
                        <FileuploadCard
                            label="대표 사진"
                            src={imageList[0] ? imageList[0].src : noImg}
                            onChange={handleChangeImageList}
                            ctg="profile"
                        />
                    </FormTable>
                    <SectionMain
                        audioMain={audioMain}
                        handleChangeAudioMain={handleChangeAudioMain}
                    />
                </div>
            </ContainerStyled>
        </Modal>
    );
};

export default ModalAudio;
