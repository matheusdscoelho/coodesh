import { useEffect, useState } from "react";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Grid,
  Card,
  Box,
  IconButton,
  Typography,
} from "@mui/material";

import SidebarDrawer from "./components/Sidebar";
import MusicStyleCard from "./components/Card";
import AppBarComponent from "./components/AppBar";

import { RadioStation } from "./services/types";
import { fetchStations } from "./services/get-radios";
import { PlayArrow, Square } from "@mui/icons-material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#4d4d56",
    },
  },
});

const App = () => {
  const [open, setOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedStations, setSelectedStations] = useState<RadioStation[]>([]);
  const [stations, setStations] = useState<RadioStation[]>([]);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );
  const [currentlyPlayingStation, setCurrentlyPlayingStation] =
    useState<RadioStation | null>(null);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    fetchStations(searchQuery).then((response) => {
      setStations(response.stations);
    });
  }, [searchQuery]);

  const handleStationSelect = (station: RadioStation) => {
    setSelectedStations((prev) =>
      prev.includes(station)
        ? prev.filter((s) => s.stationuuid !== station.stationuuid)
        : [...prev, station]
    );
  };

  const handleAudioPlayPause = (station: RadioStation) => {
    if (
      currentlyPlayingStation &&
      currentlyPlayingStation.stationuuid !== station.stationuuid
    ) {
      currentAudio?.pause();
      setCurrentlyPlayingStation(null);
    }

    if (currentlyPlayingStation?.stationuuid !== station.stationuuid) {
      const audio = new Audio(station.url);
      audio.play();
      setCurrentAudio(audio);
      setCurrentlyPlayingStation(station);
    } else {
      currentAudio?.pause();
      setCurrentlyPlayingStation(null);
    }
  };

  const handleRemoveStation = (station: RadioStation) => {
    setSelectedStations((prev) =>
      prev.filter((s) => s.stationuuid !== station.stationuuid)
    );
  };

  const handleEditStation = (updatedStation: RadioStation) => {
    setSelectedStations((prev) =>
      prev.map((station) =>
        station.stationuuid === updatedStation.stationuuid
          ? updatedStation
          : station
      )
    );
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.target.value);
  };

  const filteredSelectedStations = selectedStations.filter((station) =>
    station.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const sortedStations = stations
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter((station) =>
      station.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div style={{ display: "flex" }}>
        <AppBarComponent
          toggleDrawer={toggleDrawer}
          searchInput={searchInput}
          onSearchInputChange={handleSearchInputChange}
        />
        <SidebarDrawer
          open={open}
          toggleDrawer={toggleDrawer}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          stations={sortedStations}
          selectedStations={filteredSelectedStations}
          onStationSelect={handleStationSelect}
        />
        <Card
          style={{
            marginTop: 150,
            marginLeft: 240,
            padding: "20px",
            width: "60%",
            borderRadius: 5,
          }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              key={currentlyPlayingStation?.stationuuid}
            >
              <Box display='flex' flexDirection='row' alignItems='center'>
                <Box
                  display='flex'
                  flexDirection='column'
                  sx={{ marginRight: "10px" }}
                >
                  <IconButton
                    sx={{ marginTop: "10px", backgroundColor: "#4d4d56" }}
                    onSelect={() =>
                      currentlyPlayingStation
                        ? handleAudioPlayPause(currentlyPlayingStation)
                        : undefined
                    }
                  >
                    {currentlyPlayingStation?.stationuuid ? (
                      <Square sx={{ color: "black" }} />
                    ) : (
                      <PlayArrow sx={{ color: "black" }} />
                    )}
                  </IconButton>
                </Box>
                <Box display='flex' flexDirection='column'>
                  <Typography variant='h6' align='center'>
                    Tocando - {currentlyPlayingStation?.name}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            {filteredSelectedStations.map((station) => (
              <Grid item xs={12} sm={12} md={12} key={station.stationuuid}>
                <MusicStyleCard
                  station={station}
                  isPlaying={
                    currentlyPlayingStation?.stationuuid === station.stationuuid
                  }
                  onSelect={() => handleAudioPlayPause(station)}
                  onRemove={() => handleRemoveStation(station)}
                  onEdit={handleEditStation}
                />
              </Grid>
            ))}
          </Grid>
        </Card>
      </div>
    </ThemeProvider>
  );
};

export default App;
