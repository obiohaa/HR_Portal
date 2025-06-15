import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGlobalContext } from "../../../Context/userContext";
import { toast } from "react-toastify";
import { axiosFetch } from "../../../Utils/axiosFetch";
import PageLoading from "../../../Components/PageLoading";
import AgreeModal from "../../../Components/AgreeModal";
import Modal from "../../../Components/Modal";
import capitalizeFirstLetter from "../../../Components/ToUpperCase";

const NDA = () => {
  const { userStepState, user, isModalOpen, openModal } = useGlobalContext();

  const queryClient = useQueryClient();

  //API CALL FOR CHANGING STEP VIEW
  const { mutate: previousStep, isLoading } = useMutation({
    mutationFn: async (previousStep) =>
      axiosFetch.post("/users/updateUserPrevStepState", { previousStep }),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["bioDataKey"] });
      toast.success(data.data.steps.msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toastGood",
      });
    },
    onError: (error) => {
      toast.error(error.response.data.msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toastBad",
      });
    },
  });

  const goPrev = (event) => {
    event.preventDefault();
    previousStep();
  };

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <div className="formsContainerBody">
      {userStepState && userStepState.completedStep >= 4 ? (
        <Modal />
      ) : (
        <div className="NDAForm">
          {isModalOpen && <AgreeModal />}
          <div className="NDAContainer">
            <h2>Non-Disclosure Agreement</h2>

            <p className="firstParagraph">
              I, {user && capitalizeFirstLetter(user.firstName)}{" "}
              {user && capitalizeFirstLetter(user.lastName)} agree with other and valuable
              consideration, the receipt and sufficiency of which is hereby acknowledged, the
              parties agreed as follows:
            </p>

            <div className="secondParagraph">
              <p>
                A: This Agreement forms part of the Employment Contract of the Employee & is to be
                read in conjunction with The Place Non-Disclosure Policies contained in the Employee
                handbook.
              </p>

              <p>
                B: It is understood that unauthorized disclosure or use, whether intentional or
                unintentional, of any of the Company Information would be detrimental to The Place.
                Accordingly, The Employee agrees as follows:
              </p>
            </div>

            <ol className="NDAList">
              <li>
                Employee <strong>IS NOT</strong> allowed to give out Company Information such as
                recipes, new products, ideas, processes/techniques, financial information, staff
                information, etc. without approval from The Place’s Top Management.
              </li>
              <li>
                Not to disclose to any third party the Company Information, except as required by
                law or as may be necessary to enforce the terms hereof.
              </li>
              <li>
                Not to use any of the Company Information for any purpose other than for or in
                connection with the purposes of The Place.
              </li>
              <li>
                The recipe should not be written down/copied or verbally transmitted to other
                persons without The Place’s Top Management’s authorization.
              </li>
              <li>
                No Company’s document & Company Information SHALL be taken out of the premise
                without The Place’s Top Management’s approval.
              </li>
              <li>
                To maintain the entire Company Information in confidence and not to disclose any
                portion of it to any person or entity not authorized hereunder without the prior
                written consent of The Place.
              </li>
              <li>
                That any dissemination of Company Information shall be only in connection with
                his/her employment, and shall be only to the employees, agents or affiliates of The
                Place who have a need to be informed about said Company Information.
              </li>
              <li>
                Further, that The Place shall cause such employees, agents and affiliates who have
                access to the Company Information to comply with the terms and provisions of this
                Agreement in the same manner as each party is bound; with The Place remaining
                responsible for the actions and disclosures of such representatives.
              </li>
              <li>
                That, upon termination of the employment whether voluntary or non-voluntary, all
                records, any compositions, articles, documents and other items which contain,
                disclose and/or embody any Company Information shall be returned to The Place or
                destroyed by the Employee, and the Employee will certify that the provisions of this
                paragraph have been complied with.
              </li>
              <li>
                The parties hereto acknowledge that the Company Information is the property of The
                Place and the disclosure of the Company Information to the Employee does not convey
                any right, title or license in the Company Information to the Employee.
              </li>
              <li>
                It is further understood and agreed that no failure or delay by The Place in
                exercising any right, power or privilege hereunder shall operate as a waiver
                thereof.
              </li>
              <li>
                It is the responsibility of everyone staff to protect the Company’s confidential
                information and be careful who they share it with even if the other person is a
                staff of the Company.
              </li>
              <li>
                Staff must immediately inform Management if they are aware or suspect that Company’s
                confidential information has been disclosed to/shared with unauthorised persons.
              </li>
              <li>
                An Employee contravening this Agreement by disseminating or giving away Company
                Information unauthorized would be sued or prosecuted with damages of N1,000,000 or
                more; it would also result in immediate termination of employment.
              </li>
              <li>
                The termination of employment or relationship shall not relieve the employee of the
                obligations of non-disclosure or the obligation to return or destroy certain
                materials.
              </li>
              <li>
                The parties agree that money damages may not be sufficient remedy for any breach of
                this Agreement; the non-breaching party shall be entitled to injunctive and other
                available relief.
              </li>
              <li>
                This Agreement shall be governed by the laws of the Federal Republic of Nigeria. If
                any provision is prohibited or invalid, the rest remain effective.
              </li>
              <li>
                This Agreement may be modified or waived only in a separate written document by the
                parties.
              </li>
              <li>
                This Agreement may be executed in counterparts, each of which shall be an original.
              </li>
              <li>
                References to The Place (Strack Ventures) and the Employee shall be deemed to
                include their affiliates.
              </li>
              <li>
                Any disputes arising out of this Agreement shall be venued in a Court in Nigeria.
              </li>
              <li>
                This Agreement shall be binding upon the parties and their successors and assigns.
              </li>
            </ol>
          </div>
          <div className="NOKbtns">
            <button className="btn" onClick={goPrev}>
              Prev
            </button>
            <button type="submit" className="btn" onClick={openModal}>
              Agree
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NDA;
