import { Dialog, Modal } from '@material-ui/core'
import React, { useCallback } from 'react'
import Drawer from 'src/components/Drawer'
import useOpen from 'src/hooks/useOpen'

type ContainerProps = unknown

type Props = {
  isBottomOpen: boolean
  onBottomOpen: () => void
  onBottomClose: () => void
  isRightOpen: boolean
  onRightOpen: () => void
  onRightClose: () => void
  onCloseAllDrawer: () => void
  isModalOpen: boolean
  onModalOpen: () => void
  onModalClose: () => void
  isDialogOpen: boolean
  onDialogOpen: () => void
  onDialogClose: () => void
}

export const Component: React.FC<Props> = (props) => (
  <div className="flex m-6 relative">
    {/* bottom drawer */}
    <Drawer
      anchor="bottom"
      color="blue"
      open={props.isBottomOpen}
      onOpen={props.onBottomOpen}
      onClose={props.onBottomClose}
    />

    {/* right drawer */}
    <Drawer
      anchor="right"
      color="teal"
      open={props.isRightOpen}
      onOpen={props.onRightOpen}
      onClose={props.onRightClose}
    />

    {/* close all */}
    <button className="mx-4 bg-orange-500 text-white rounded-md p-4" type="button" onClick={props.onCloseAllDrawer}>
      close all drawers
    </button>

    {/* modal */}
    <button className="mx-4 bg-red-500 text-white rounded-md p-4" type="button" onClick={props.onModalOpen}>
      Open modal
    </button>
    <Modal open={props.isModalOpen}>
      <div className="w-64 h-64 flex justify-center items-center flex-col absolute top-1/2 left-1/2 bg-white rounded-md">
        <span className="text-2xl">modal</span>
        <button className="mx-4 bg-red-500 text-white rounded-md p-4" type="button" onClick={props.onModalClose}>
          close
        </button>
      </div>
    </Modal>

    {/* dialog  */}
    <button className="mx-4 bg-gray-500 text-white rounded-md p-4" type="button" onClick={props.onDialogOpen}>
      Open dialog
    </button>
    <Dialog fullScreen={true} open={props.isDialogOpen}>
      <div className="mt-24 flex justify-center items-center flex-col bg-white">
        <span className="text-2xl">dialog</span>
        <button
          className="m-8 bg-gray-500 text-white rounded-md p-4"
          type="button"
          onClick={() => {
            props.onDialogClose()
            props.onBottomClose()
          }}
        >
          close
        </button>
        <Drawer
          anchor="bottom"
          color="blue"
          open={props.isBottomOpen}
          onOpen={props.onBottomOpen}
          onClose={props.onBottomClose}
        />
      </div>
    </Dialog>
  </div>
)

const Container: React.FC<ContainerProps> = () => {
  const { isOpen: isBottomOpen, handleOpen: handleBottomOpen, handleClose: handleBottomClose } = useOpen()
  const { isOpen: isRightOpen, handleOpen: handleRightOpen, handleClose: handleRightClose } = useOpen()

  const handleCloseAllDrawer = useCallback(() => {
    handleBottomClose()
    handleRightClose()
  }, [])

  const { isOpen: isModalOpen, handleOpen: handleModalOpen, handleClose: handleModalClose } = useOpen()
  const { isOpen: isDialogOpen, handleOpen: handleDialogOpen, handleClose: handleDialogClose } = useOpen()

  return (
    <Component
      isBottomOpen={isBottomOpen}
      onBottomOpen={handleBottomOpen}
      onBottomClose={handleBottomClose}
      isRightOpen={isRightOpen}
      onRightOpen={handleRightOpen}
      onRightClose={handleRightClose}
      onCloseAllDrawer={handleCloseAllDrawer}
      isModalOpen={isModalOpen}
      onModalOpen={handleModalOpen}
      onModalClose={handleModalClose}
      isDialogOpen={isDialogOpen}
      onDialogOpen={handleDialogOpen}
      onDialogClose={handleDialogClose}
    />
  )
}

Container.displayName = 'ModalPage'

export default Container
