import React from "react";
import AliceCarousel from 'react-alice-carousel';

import { SliderItem, SliderSceleton } from "./SliderItem";

const SliderComponent = ({data, setDrawerState}) => {

	return (
		<AliceCarousel mouseTrackingEnabled buttonsDisabled={true} dotsDisabled={true} autoPlay={false} autoPlayInterval={5000}>
		  	{
				data.map(anime => 
					<SliderItem
						key={anime.slug}
				  		anime={anime}
				  		setDrawerState={setDrawerState}
				  	/>
				)
			}
		</AliceCarousel>

	);
}

export { SliderComponent as Slider, SliderSceleton };
