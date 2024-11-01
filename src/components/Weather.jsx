import {
  Container,
  InputAdornment,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "../assets/clear.png";
import WindIcon from "@mui/icons-material/WindPower";
import HumidityIcon from "@mui/icons-material/Water";
import { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid2";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Weather() {
  const api_key = "edf7342cbaecac186be5d986e2672268";

  const [temp, setTemp] = useState(35);
  const [city, setCity] = useState("Rawalpindi");
  const [humidity, setHumidity] = useState(35);
  const [wind, setWind] = useState(1.4);

  const inputRef = useRef();

  useEffect(() => {
    search("Islamabad");
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#550a55",
      },
      secondary: {
        main: "#4800ff",
      },
    },
    typography: {
      fontFamily: "sans-serif",
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            padding: 40,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            background: "linear-gradient(#550a55,#4800ff)",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            padding: 15,
            borderRadius: 26,
            border: "white",
            width: 250,
            backgroundColor: "white",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            padding: 12,
            borderRadius: 26,
            border: "none",
            transition: "2ms ease-in",
            backgroundColor: "whitesmoke",
            "&:hover": {
              backgroundColor: "white",
              cursor: "pointer",
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          tempValue: {
            fontSize: "4rem",
            color: "whitesmoke",
            fontWeight: 600,
          },
          cityName: {
            fontSize: "1.5rem",
            color: "whitesmoke",
            fontWeight: 400,
            letterSpacing: 2,
          },
          humidityText: {
            fontSize: 15,
            color: "whitesmoke",
            fontWeight: 400,
            textAlign: "center",
          },
          humidityValue: {
            fontSize: 24,
            color: "whitesmoke",
            fontWeight: 600,
            textAlign: "center",
          },
          windSpeedText: {
            fontSize: 15,
            color: "whitesmoke",
            fontWeight: 400,
            textAlign: "center",
          },
          windSpeedValue: {
            fontSize: 24,
            color: "whitesmoke",
            fontWeight: 600,
            textAlign: "center",
          },
        },
        variants: [
          {
            props: { variant: "tempValue" },
            style: {
              fontSize: "4rem",
              color: "whitesmoke",
              fontWeight: 600,
            },
          },
          {
            props: { variant: "cityName" },
            style: {
              fontSize: "1.5rem",
              color: "whitesmoke",
              fontWeight: 400,
              letterSpacing: 2,
            },
          },
          {
            props: { variant: "humidityText" },
            style: {
              fontSize: 15,
              color: "whitesmoke",
              fontWeight: 400,
              textAlign: "center",
            },
          },
          {
            props: { variant: "humidityValue" },
            style: {
              fontSize: 20,
              color: "whitesmoke",
              fontWeight: 600,
              textAlign: "center",
            },
          },
          {
            props: { variant: "windSpeedText" },
            style: {
              fontSize: 15,
              color: "whitesmoke",
              fontWeight: 400,
              textAlign: "center",
            },
          },
          {
            props: { variant: "windSpeedValue" },
            style: {
              fontSize: 20,
              color: "whitesmoke",
              fontWeight: 600,
              textAlign: "center",
            },
          },
        ],
      },
    },
  });

  const search = async (input) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api_key}`;
      const response = await fetch(url);
      const data = await response.json();
      setCity(data.name);
      setTemp(Math.floor(data.main.temp));
      setWind(data.wind.speed);
      setHumidity(data.main.humidity);
    } catch (error) {}
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ mt: 2 }}>
        <Paper elevation={3} sx={{ p: 4, pt:12, pb:12, display:'flex', flexDirection:'column', justifyContent:'center', }}>
          <Grid container spacing={12}>
            <Box sx={{ margin: "auto" }}>
              <Grid item xs={12}>
                <InputBase
                  variant="outlined"
                  placeholder="Enter city name"
                  inputRef={inputRef}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => search(inputRef.current.value)}
                      >
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  sx={{
                    width: "100%",
                    padding: 1.5,
                    borderRadius: 26,
                    border: "none",
                  }}
                />
              </Grid>
            </Box>

            <Box sx={{ margin: "auto" }}>
              <Grid item xs={12} sm={3} md={3} lg={3}>
                <Stack direction="column" sx={{ alignItems: "center" }}>
                  <img src={ClearIcon} width={100} alt="weather_Position"/>
                  <Typography variant="tempValue">{temp}&#8451;</Typography>
                  <Typography variant="cityName">{city}</Typography>
                </Stack>
              </Grid>
            </Box>

            <Box sx={{ margin: "auto" }}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Stack direction="row" spacing={6}>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Stack direction="row" spacing={1} sx={{alignItems:'center'}}>
                    <WindIcon sx={{ color: "whitesmoke" }} />
                    <Stack direction="column">
                      <Typography variant="windSpeedText">
                        Wind Speed
                      </Typography>
                      <Typography variant="windSpeedValue">
                        {wind} km/hr
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                  <Stack direction="row" spacing={1} sx={{alignItems:'center'}}>
                    <HumidityIcon sx={{ color: "whitesmoke" }} />
                    <Stack direction="column">
                      <Typography variant="humidityText">Humidity</Typography>
                      <Typography variant="humidityValue">
                        {humidity}%
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
              </Stack>
            </Grid>
            </Box>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default Weather;
