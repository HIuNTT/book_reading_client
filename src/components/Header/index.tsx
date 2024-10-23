import SearchIcon from '@/../../public/img/search_icon.png'
import BellIcon from '@/../../public/img/bell_icon.png'
import UserIcon from '@/../../public/img/user_icon.png'
import HomeIcon from '@/../../public/img/home_icon.png'
import { Button, Modal } from 'antd'
import LoginModal from 'modules/auth/components/LoginModal'
import useDisclosure from 'hooks/useDisclosure'
import SignupModal from 'modules/auth/components/SignupModal'

const Data = [
  {
    id: 1,
    name: 'Loai 1',
  },
  {
    id: 2,
    name: 'Loai 2',
  },
  {
    id: 3,
    name: 'Loai 3',
  },
  {
    id: 4,
    name: 'Loai 4',
  },
  {
    id: 5,
    name: 'Loai 5',
  },
]

const Header = () => {
  const disclosureLogin = useDisclosure()
  const disclosureSignup = useDisclosure()

  return (
    <>
      <div className="w-full bg-[#e369ac] px-[40px] pt-[5px]">
        <div className="flex justify-between gap-8">
          <div className="flex items-center gap-9">
            <div className="px-3 py-1">
              <img src={HomeIcon} alt="Home" className="max-w-10 cursor-pointer" />
            </div>
            <div className="flex flex-1 cursor-pointer flex-wrap gap-x-5">
              {Data.map((item, index) => (
                <div className="py-2" key={index}>
                  {item.name}
                </div>
              ))}
            </div>
          </div>
          <div className="flex h-fit items-center gap-4">
            <div className="px-3 py-1">
              <img src={SearchIcon} alt="Search" className="max-w-8 cursor-pointer" />
            </div>
            <div className="px-3 py-1">
              <img src={BellIcon} alt="Bell" className="max-w-8 cursor-pointer" />
            </div>
            <div className="overflow-hidden rounded-full px-3 py-1">
              <img src={UserIcon} alt="User" className="h-[32px] w-[32px] max-w-8 cursor-pointer" />
            </div>
            <Button color="primary" variant="filled" onClick={disclosureSignup.onOpen}>
              Đăng ký
            </Button>
            <Button type="primary" onClick={disclosureLogin.onOpen}>
              Đăng nhập
            </Button>
          </div>
        </div>
      </div>

      <Modal
        className="!transform-none"
        classNames={{ content: '!rounded-[30px]' }}
        open={disclosureLogin.isOpen}
        footer={null}
        width={582}
        centered
        onCancel={disclosureLogin.onClose}
      >
        <LoginModal onSwitchSignup={disclosureSignup.onOpenChange} onCloseModal={disclosureLogin.onClose} />
      </Modal>

      <Modal
        className="!transform-none"
        classNames={{ content: '!rounded-[30px]' }}
        open={disclosureSignup.isOpen}
        footer={null}
        width={582}
        centered
        onCancel={disclosureSignup.onClose}
      >
        <SignupModal onSwitchLogin={disclosureLogin.onOpenChange} onCloseModal={disclosureSignup.onClose} />
      </Modal>
    </>
  )
}

export default Header
