import React, { useState } from "react";
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { PlayArrow, Square } from "@mui/icons-material";

import { RadioStation } from "../../services/types";

import EditStationDialog from "../EditStationDialog";

interface MusicStyleCardProps {
  station: RadioStation;
  isPlaying: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onEdit: (updatedStation: RadioStation) => void;
}

const MusicStyleCard: React.FC<MusicStyleCardProps> = ({
  station,
  isPlaying,
  onSelect,
  onRemove,
  onEdit,
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleSaveEdit = (updatedStation: RadioStation) => {
    onEdit(updatedStation);
    setOpenDialog(false);
  };

  return (
    <Card variant='elevation'>
      <CardContent>
        <Box
          display='flex'
          flexDirection='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <Box display='flex' flexDirection='column'>
            <IconButton sx={{ marginTop: "10px" , backgroundColor:"#4d4d56"}} onClick={onSelect}>
              {isPlaying ? (
                <Square sx={{ color: "black" }} />
              ) : (
                <PlayArrow sx={{ color: "black" }} />
              )}
            </IconButton>
          </Box>
          <Box display='flex' flexDirection='column'>
            <Typography variant='h6' align='center'>
              {station.name}
            </Typography>
            <Typography variant='body2' color='text.secondary' align='center'>
              {station.country}, {station.tags}
            </Typography>
          </Box>
          <Box display='flex' flexDirection='row'>
            <IconButton
              onClick={onRemove}
              sx={{ color: "#000", marginRight: 1 }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={handleDialogOpen} sx={{ color: "#000" }}>
              <EditIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>

      <EditStationDialog
        open={openDialog}
        station={station}
        onClose={handleDialogClose}
        onSave={handleSaveEdit}
      />
    </Card>
  );
};

export default MusicStyleCard;
