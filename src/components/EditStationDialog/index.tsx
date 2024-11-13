import React, { ChangeEvent } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { RadioStation } from "../../services/types";

interface EditStationDialogProps {
  open: boolean;
  station: RadioStation;
  onClose: () => void;
  onSave: (updatedStation: RadioStation) => void;
}

const EditStationDialog: React.FC<EditStationDialogProps> = ({
  open,
  station,
  onClose,
  onSave,
}) => {
  const [editedStation, setEditedStation] = React.useState<RadioStation>(station);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedStation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEdit = () => {
    onSave(editedStation);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Station Information</DialogTitle>
      <DialogContent>
        <TextField
          label="Station Name"
          name="name"
          value={editedStation.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Country"
          name="country"
          value={editedStation.country}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="State"
          name="state"
          value={editedStation.state}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Language"
          name="language"
          value={editedStation.language}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Votes"
          name="votes"
          value={editedStation.votes}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          type="number"
        />
        <TextField
          label="Bitrate"
          name="bitrate"
          value={editedStation.bitrate}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          type="number"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSaveEdit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditStationDialog;
