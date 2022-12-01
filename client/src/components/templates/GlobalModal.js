import { useDispatch, useSelector } from 'react-redux';
import Friend from './Friends';
import Letter from './Letter';
import modalSlice, { selectModal } from '../../redux/modalSlice';
import TodoList from '../module/TodoList';
import ThemeStore from '../module/ThemeStore';
import GradientWall from '../module/GradientWall';
import LookBack from '../module/LookBack';
import MoodSelector from '../module/MoodSelector';
import styled from 'styled-components';

const MODAL_TYPES = {
  LetterModal: 'LetterModal',
  TodoModal: 'TodoModal',
  FriendModal: 'FriendModal',
  ThemeModal: 'ThemeModal',
  GradientModal: 'GradientModal',
  LookbackModal: 'LookbackModal',
};

const ModalLayout = styled.div`
  display: flex;
`;
function GlobalModal({ lookbackRefresh, lookbackRefresher, pointRefresher }) {
  const MODAL_COMPONENTS = [
    {
      type: MODAL_TYPES.LetterModal,
      component: <Letter pointRefresher={pointRefresher} />,
    },
    {
      type: MODAL_TYPES.TodoModal,
      component: (
        <TodoList
          lookbackRefresher={lookbackRefresher}
          pointRefresher={pointRefresher}
        />
      ),
    },
    {
      type: MODAL_TYPES.FriendModal,
      component: <Friend />,
    },
    {
      type: MODAL_TYPES.ThemeModal,
      component: <ThemeStore pointRefresher={pointRefresher} />,
    },
    {
      type: MODAL_TYPES.GradientModal,
      component: <GradientWall />,
    },
    {
      type: MODAL_TYPES.LookbackModal,
      component: <LookBack lookbackRefresh={lookbackRefresh} />,
    },
  ];
  const { modalType, isOpen } = useSelector(selectModal);
  if (!isOpen) return;

  const findModal = MODAL_COMPONENTS.find(modal => {
    return modal.type === modalType;
  });

  const renderModal = () => {
    return findModal.component;
  };
  return (
    <ModalLayout>
      {findModal.type !== 'LookbackModal' ? <MoodSelector /> : null}
      {renderModal()}
    </ModalLayout>
  );
}

export default GlobalModal;
