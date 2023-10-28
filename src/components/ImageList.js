import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useState } from "react";

export default function StandardImageList({ pokemonToUpdate, info, setInfo }) {
  // const [selected, setSelected] = React.useState({});
  // setSelected((st) => st + 1);

  const sprites = pokemonToUpdate?.sprites;
  const [selectedImage, setSelectedImage] = useState(null);

  const images = {
    back_default: sprites?.back_default,
    back_female: sprites?.back_female,
    back_shiny: sprites?.back_shiny,
    back_shiny_female: sprites?.back_shiny_female,
    front_default: sprites?.front_default,
    front_female: sprites?.front_female,
    front_shiny: sprites?.front_shiny,
    front_shiny_female: sprites?.front_shiny_female,
    dream_world_front_default: sprites?.other.dream_world.front_default,
    dream_world_front_female: sprites?.other.dream_world.front_female,
    home_front_default: sprites?.other.home.front_default,
    home_front_female: sprites?.other.home.front_female,
    home_front_shiny: sprites?.other.home.front_shiny,
    home_front_shiny_female: sprites?.other.home.front_shiny_female,
    artwork_front_default: sprites?.other["official-artwork"].front_default,
    artwork_front_shiny: sprites?.other["official-artwork"].front_shiny,
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {Object.entries(images).map(([key, value]) => {
          if (value === null) {
            return <></>;
          }
          const imgSrc = `${value}?w=164&h=164&fit=crop&auto=format`;

          const handleClick = () => {
            setSelectedImage(key);
            setInfo({
              ...info,
              img: `${value}?w=164&h=164&fit=crop&auto=format`,
            });
          };

          return (
            <ImageListItem key={key}>
              {value && (
                <img
                  src={imgSrc}
                  alt={key}
                  loading="lazy"
                  onClick={handleClick}
                  style={{
                    border: selectedImage === key ? "3px solid red" : "none",
                    width: "160px",
                    height: "160px",
                  }}
                />
              )}
              <ImageListItemBar title={key} />
            </ImageListItem>
          );
        })}
      </ImageList>
    </div>
  );
}
