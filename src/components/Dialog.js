import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import useStore from "../store/zustandStore";
import { Box } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs({ open, setOpen, name }) {
  const { pokemonData } = useStore();

  const selectedPokemon = pokemonData.find((poke) => poke.name === name);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Sprites
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <SpritesImages selectedpokemon={selectedPokemon} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

export const SpritesImages = ({ selectedpokemon }) => {
  const spriteImages = [
    {
      key: "front_default",
      label: "Vista frontal (predeterminado)",
    },
    {
      key: "front_shiny",
      label: "Vista frontal (brillante)",
    },
    {
      key: "back_default",
      label: "Vista trasera (predeterminado)",
    },
    {
      key: "back_shiny",
      label: "Vista trasera (brillante)",
    },
    {
      key: "other.home.front_default",
      label: "Vista frontal en casa (predeterminado)",
    },
    {
      key: "other.home.front_shiny",
      label: "Vista frontal en casa (brillante)",
    },
    {
      key: 'other["official-artwork"].front_default',
      label: "Vista frontal de arte oficial (predeterminado)",
    },
    {
      key: 'other["official-artwork"].front_shiny',
      label: "Vista frontal de arte oficial (brillante)",
    },
    {
      key: "other.dream_world.front_default",
      label: "Vista frontal de Mundo de los Sueños (predeterminado)",
    },
  ];

  return (
    <div>
      {spriteImages.map((sprite, index) => {
        const spritePath = sprite.key.split(".");
        let spriteValue = selectedpokemon?.sprites;
        spritePath.forEach((path) => {
          spriteValue = spriteValue?.[path];
        });

        return (
          <Box
            key={index}
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
          >
            {spriteValue && (
              <figure
                key={sprite.key}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <img
                  src={spriteValue}
                  width={"200px"}
                  height={"200px"}
                  alt={sprite.label}
                />
                <figcaption style={{ width: "200px", textAlign: "center" }}>
                  {sprite.label}
                </figcaption>
              </figure>
            )}
          </Box>
        );
      })}
    </div>
  );
};
