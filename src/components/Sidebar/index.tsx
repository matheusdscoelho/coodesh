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
      data-testid='sidebar-drawer'
    >
      <List>
        <ListItem>
          <ListItemButton
            onClick={toggleDrawer}
            data-testid='toggle-drawer-button'
          >
            <ListItemIcon data-testid='drawer-icon'>
              {open ? <ChevronLeft /> : <Menu />}
            </ListItemIcon>
            {open && <ListItemText primary='Menu' data-testid='menu-text' />}
          </ListItemButton>
        </ListItem>
        <Divider data-testid='drawer-divider' />

        {open && (
          <ListItem data-testid='search-container'>
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
              data-testid='search-input'
            />
          </ListItem>
        )}
        <Divider data-testid='search-divider' />

        {open &&
          stations.map((station) => (
            <ListItem
              key={station.stationuuid}
              data-testid={`station-${station.stationuuid}`}
            >
              <ListItemButton
                onClick={() => onStationSelect(station)}
                sx={{ backgroundColor: "#4d4d56", padding: 1, borderRadius: 5 }}
                data-testid={`station-button-${station.stationuuid}`}
              >
                <ListItemText
                  primary={station.name}
                  data-testid={`station-name-${station.stationuuid}`}
                />
                <ListItemIcon
                  data-testid={`station-check-icon-${station.stationuuid}`}
                >
                  {selectedStations.find(
                    (selectedStation) =>
                      selectedStation.stationuuid === station.stationuuid
                  ) && <CheckCircle color='primary' />}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Drawer>
  );
};

export default SidebarDrawer;
