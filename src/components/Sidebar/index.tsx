import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  TextField,
} from "@mui/material";
import { ChevronLeft, Menu, CheckCircle } from "@mui/icons-material";
import { RadioStation } from "../../services/types";

interface SidebarDrawerProps {
  open: boolean;
  toggleDrawer: () => void;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  stations: RadioStation[];
  selectedStations: RadioStation[];
  onStationSelect: (station: RadioStation) => void;
}

const SidebarDrawer: React.FC<SidebarDrawerProps> = ({
  open,
  toggleDrawer,
  searchQuery,
  setSearchQuery,
  stations,
  selectedStations,
  onStationSelect,
}) => {
  return (
    <Drawer
      open={open}
      sx={{
        width: open ? 240 : 80,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? 240 : 80,
          transition: "width 0.3s ease",
          boxSizing: "border-box",
        },
      }}
    >
      <List>
        <ListItem>
          <ListItemButton onClick={toggleDrawer}>
            <ListItemIcon>{open ? <ChevronLeft /> : <Menu />}</ListItemIcon>
            {open && <ListItemText primary='Menu' />}
          </ListItemButton>
        </ListItem>
        <Divider />

        {open && (
          <ListItem>
            <TextField
              label='Search Stations'
              variant='filled'
              fullWidth
              size='small'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                "& .MuiFilledInput-root": {
                  background: "#4d4d56",
                },
              }}
            />
          </ListItem>
        )}
        <Divider />

        {open &&
          stations.map((station) => (
            <ListItem key={station.stationuuid}>
              <ListItemButton
                onClick={() => onStationSelect(station)}
                sx={{ backgroundColor: "#4d4d56", padding: 1, borderRadius: 5 }}
              >
                <ListItemText primary={station.name} />
                <ListItemIcon>
                  {selectedStations.includes(station) && (
                    <CheckCircle color='primary' />
                  )}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Drawer>
  );
};

export default SidebarDrawer;
