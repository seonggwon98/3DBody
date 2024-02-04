import Modal from "react-modal";
import { PropTypes } from "prop-types";
import { useState } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../../recoil/modal/ModalState";
import { baseUrlState } from "../../recoil/common/BaseUrlState";

const SelfInputFoodModal = ({ onClose }) => {
  const [modalData, setModalData] = useRecoilState(modalState);
  const baseUrl = useRecoilValue(baseUrlState);
  const [foodName, setFoodName] = useState("");
  const [servingSize, setServingSize] = useState("");
  const [calorie, setCalorie] = useState("");
  const [carbohydrate, setCarbohydrate] = useState("");
  const [protein, setProtein] = useState("");
  const [lipid, setLipid] = useState("");

  // 직접입력 음식 등록하기
  const onClickPostFood = async () => {
    await axios
      .get(`${baseUrl}api/management/food/add`, {
        name: foodName,
        category: modalData.data,
        servingSize: servingSize,
        calorie: calorie,
        carbohydrate: carbohydrate,
        protein: protein,
        lipid: lipid,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setModalData({ type: null, data: null });
  };

  // 직접 입력 정보 ----------------------------------------------------------------------
  const foodNameDiv = () => {
    const onChangeInput = (e) => {
      setFoodName(e.target.value);
    };

    return (
      <div className="flex gap-2">
        <div className="flex basis-1/3 justify-center items-center border rounded-md bg-teal-700 text-white text-base py-1">
          식품 명
        </div>
        <input
          type="text"
          className="border-teal-700 rounded-md border-2 w-full px-2"
          onChange={onChangeInput}
        />
      </div>
    );
  };

  const servingSizeDiv = () => {
    const onChangeInput = (e) => {
      setServingSize(e.target.value);
    };

    return (
      <div className="flex gap-2">
        <div className="flex basis-1/3 justify-center items-center border rounded-md bg-teal-700 text-white text-base py-1">
          식품 양
        </div>
        <input
          type="text"
          placeholder="g 단위로 입력해주세요."
          className="border-teal-700 rounded-md border-2 w-full px-2"
          onChange={onChangeInput}
        />
      </div>
    );
  };

  const calorieDiv = () => {
    const onChangeInput = (e) => {
      setCalorie(e.target.value);
    };

    return (
      <div className="flex gap-2">
        <div className="flex basis-1/3 justify-center items-center border rounded-md bg-teal-700 text-white text-base py-1">
          칼로리
        </div>
        <input
          type="text"
          className="border-teal-700 rounded-md border-2 w-full px-2"
          onChange={onChangeInput}
        />
      </div>
    );
  };

  const carbohydrateDiv = () => {
    const onChangeInput = (e) => {
      setCarbohydrate(e.target.value);
    };

    return (
      <div className="flex gap-2">
        <div className="flex basis-1/3 justify-center items-center border rounded-md bg-teal-700 text-white text-base py-1">
          탄수화물
        </div>
        <input
          type="text"
          className="border-teal-700 rounded-md border-2 w-full px-2"
          onChange={onChangeInput}
        />
      </div>
    );
  };

  const proteinDiv = () => {
    const onChangeInput = (e) => {
      setProtein(e.target.value);
    };

    return (
      <div className="flex gap-2">
        <div className="flex basis-1/3 justify-center items-center border rounded-md bg-teal-700 text-white text-base py-1">
          단백질
        </div>
        <input
          type="text"
          className="border-teal-700 rounded-md border-2 w-full px-2"
          onChange={onChangeInput}
        />
      </div>
    );
  };

  const lipidDiv = () => {
    const onChangeInput = (e) => {
      setLipid(e.target.value);
    };

    return (
      <div className="flex gap-2">
        <div className="flex basis-1/3 justify-center items-center border rounded-md bg-teal-700 text-white text-base py-1">
          지방
        </div>
        <input
          type="text"
          className="border-teal-700 rounded-md border-2 w-full px-2"
          onChange={onChangeInput}
        />
      </div>
    );
  };
  // 직접 입력 정보 끝 ----------------------------------------------------------------------

  return (
    <Modal
      className={"fixed bottom-0 bg-gray-200 overflow-auto inset-x-0"}
      isOpen={modalData.type === "selfInputFood"}
      ariaHideApp={false}
      onRequestClose={() => setModalData({ type: null, data: null })}
    >
      <div className="m-4 flex flex-col gap-2">
        <p className="font-semibold">음식 직접입력</p>
        {foodNameDiv()}
        {servingSizeDiv()}
        {calorieDiv()}
        {carbohydrateDiv()}
        {proteinDiv()}
        {lipidDiv()}
        <div className="flex gap-2 mt-2">
          <button
            onClick={onClose}
            className="basis-1/2 border border-teal-700 rounded-md bg-white text-teal-700 py-1"
          >
            취소
          </button>
          <button
            onClick={() => onClickPostFood()}
            className="basis-1/2 border rounded-md  bg-teal-700 text-white py-1"
          >
            추가하기
          </button>
        </div>
      </div>
    </Modal>
  );
};

SelfInputFoodModal.propTypes = {
  onClose: PropTypes.func,
};

export default SelfInputFoodModal;
