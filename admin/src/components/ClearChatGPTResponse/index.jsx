import React from "react";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  Stack,
  Flex,
  Typography,
  Button,
} from "@strapi/design-system";

import { ExclamationMarkCircle, Trash } from "@strapi/icons";
const ClearChatGPTResponse = ({ isOpen, setIsOpen, onConfirm }) => {
  return (
    <Dialog
      onClose={() => setIsOpen(false)}
      title="Confirmation"
      isOpen={isOpen}
    >
      <DialogBody icon={<ExclamationMarkCircle />}>
        <Stack spacing={2}>
          <Flex justifyContent="center">
            <Typography id="confirm-description">
              Are you sure you want to clear chatGPT history?
            </Typography>
          </Flex>
        </Stack>
      </DialogBody>
      <DialogFooter
        startAction={
          <Button onClick={() => setIsOpen(false)} variant="tertiary">
            Cancel
          </Button>
        }
        endAction={
          <Button
            onClick={onConfirm}
            variant="danger-light"
            startIcon={<Trash />}
          >
            Confirm
          </Button>
        }
      />
    </Dialog>
  );
};

export default ClearChatGPTResponse;
