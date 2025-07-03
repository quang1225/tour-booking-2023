import useMutateLogout from '@/hooks/api/user/useMutateLogout'
import Button from '../Button'
import CenterModal from './CenterModal'
import SpinnerIcon from '@/app/(client-components)/SpinnerIcon'

interface LogoutModalI {
  visible: boolean
  onClose: () => void
}

const LogoutModal: React.FC<LogoutModalI> = ({ visible, onClose }) => {
  const { logout, loadingLogout } = useMutateLogout()

  const onClickLogout = async () => {
    await logout()
    onClose()
  }

  return (
    <CenterModal visible={visible} onClose={onClose}>
      <h2 className="text-center text-xl mb-5">
        Are you sure you want to logout?
      </h2>
      <div>
        <Button
          type="button"
          variant="primary"
          className="flex justify-center items-center gap-3 mb-3"
          onClick={onClickLogout}
        >
          {loadingLogout && <SpinnerIcon />} Confirm
        </Button>
        <Button
          type="button"
          variant="secondary"
          className={'bg-lightGray text-lightBlackHex'}
          onClick={onClose}
        >
          Canel
        </Button>
      </div>
    </CenterModal>
  )
}

export default LogoutModal
