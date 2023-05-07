import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { memberIdSelector } from '../../../../redux/hooks';
import { paletteCodeSelector } from '../../../../redux/hooks';
import { getFriends, getSpecificPalette } from '../../../../api/FriendDataApi';
import { getCookie } from '../../../../utils/cookie';
import { RightBottomLayout } from '../../../atoms/layout/Layouts';
import Button from '../../../atoms/button/commonButton/Button';
import Overlay from '../../../atoms/overlay/Overlay';
import Pagination from '../../../atoms/pagination/Pagination';
import BasicModal from '../../../atoms/modal/ModalItem';
import AddFriend from '../../../module/friend/create/AddFriend';
import FriendCard from '../../../module/friend/card/FriendCard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Style from './Style';
import { useQuery } from '@tanstack/react-query';
import { Friend } from '../../../module/friend/FriendType';

const Friends = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [popup, setPopup] = useState(false);
  const [limit, setLimit] = useState(0);
  const handleLimit = () => {
    const width = window.innerWidth;
    if (width >= 860) {
      setLimit(8);
    }
    if (width < 860) {
      setLimit(6);
    }
    if (width < 665) {
      setLimit(4);
    }
  };

  const id = useSelector(memberIdSelector);
  const friends = useQuery({
    queryKey: ['friend', id],
    queryFn: getFriends,
  });

  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const accessToken = getCookie('accessToken');

  const handleFindFriend = () => {
    setIsOpen(!isOpen);
    {
      accessToken
        ? setIsOpen(!isOpen)
        : (setPopup(!popup),
          toast('먼저 로그인해주세요', {
            className: 'toast-login',
            onClose: () => setPopup(false),
          }));
    }
  };
  useEffect(() => {
    window.innerWidth ? handleLimit() : 0;
    window.addEventListener('resize', handleLimit);
    return () => {
      window.removeEventListener('resize', handleLimit);
    };
  }, []);

  const getPaletteCode = useSelector(paletteCodeSelector);
  const paletteCode = getPaletteCode ? getPaletteCode : 'P001';
  const palette = useQuery({
    queryKey: ['palette', paletteCode],
    queryFn: async () => {
      const data = await getSpecificPalette(paletteCode);
      return data;
    },
  });

  return (
    <>
      {popup && <Overlay />}
      <BasicModal modalType="FriendModal">
        <Style.CardLayout>
          {friends
            ? friends.data
                ?.slice(offset, offset + limit)
                .map((friend: Friend) => {
                  return (
                    <FriendCard
                      key={friend.respondentId}
                      friend={friend}
                      friendsColor={palette?.data?.find(color => {
                        return (
                          color.mood ===
                          friend.respondentMoodPaletteDetails.mood
                        );
                      })}
                    />
                  );
                })
            : null}
        </Style.CardLayout>
        <RightBottomLayout>
          <Button size="circle" onClick={handleFindFriend}>
            +
          </Button>
        </RightBottomLayout>
        <footer>
          <Pagination
            total={friends.data?.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </footer>
      </BasicModal>
      {isOpen ? (
        <>
          <AddFriend setIsOpen={setIsOpen} friends={friends.data} />
          <Overlay />
        </>
      ) : null}
    </>
  );
};

export default Friends;
