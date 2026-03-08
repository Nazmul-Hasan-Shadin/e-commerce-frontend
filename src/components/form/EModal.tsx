import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import React, { ReactNode } from "react";

export default function EModal({
  onClose,
  isOpen,
  title,
  children,
}: {
  children: ReactNode;
  title?: string;
  isOpen: boolean;
  onClose: any;
}) {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");

  // const handleOpen = (size: string) => {
  //   setSize(size);
  //   onOpen();
  // };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {/* <Button key={size} onPress={() => handleOpen()}>
          Open {size}
        </Button> */}
      </div>
      <Modal isOpen={isOpen} size={"4xl"} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-center gap-1">
                <span> {title}</span>
              </ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
