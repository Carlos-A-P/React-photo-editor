// useState allows us to modify state in react
import React, { useState } from 'react';
import './App.css';
import Slider from './Slider'
import SidebarItem from './SidebarItem'

// side bar functionality
//create variable and set that to an array with objects
const DEFAULT_OPTIONS = [
  {
    name: 'Brightness',
    // name of property in css
    property: 'brightness',
    // default value
    value: 100,
    // our values
    range: {
      min: 0,
      max: 200
    },
    // brightness is measured in percent
    unit: '%'
  },
  {
    name: 'Contrast',
    property: 'contrast',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Saturation',
    property: 'saturate',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Grayscale',
    property: 'grayscale',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Sepia',
    property: 'sepia',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Hue Rotate',
    property: 'hue-rotate',
    value: 0,
    range: {
      min: 0,
      max: 360
    },
    unit: 'deg'
  },
  {
    name: 'Blur',
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 20
    },
    unit: 'px'
  }
]

function App() {
  // take the options from default options and set them to a state that React can modify
  // Update the value and rerender everything in react
  const [options, setOptions] = useState(DEFAULT_OPTIONS)

  // enable user to select sidebar item
  //by default we want to select the first object in our state so we useState(0)
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0)

  // get our selected option here. Equal to our options at the selected option index
  // this is our current selected option
  const selectedOption = options[selectedOptionIndex]

  function handleSliderChange({ target }) {
    setOptions(prevOptions => {
      // loop through all of our options until we find the one we want to change and then we are going to change it and update it
      return prevOptions.map((option, index) => {
        // if it is not the one we selected return as is. else return a new object from our option, which contains everything from our old option but pass the target value
        if (index !== selectedOptionIndex) return option
        return { ...option, value: target.value }
      })
    })
  }

  // take all these values and add them to our css
  function getImageStyle() {
    // go through all of our opetions 
    const filters = options.map(option => {
      // put value and untis in paranthesis since it's actually a function
      return `${option.property}(${option.value}${option.unit})`
    })
    // return object in filter key and return array of filters into a string
    return { filter: filters.join(' ') }
  }

  console.log(getImageStyle())

  return (
    //this container layout is rearranged using css grid layout
    <div className="container">

      <div className="main-image" style={getImageStyle()} />

      <div className="sidebar">
        {/* for each one of our options we want to create a sidebar item */}
        {/* have index of our array as our key */}
        {/* loop through all of our different options and create a side bar item for them */}
        {options.map((option, index) => {
          return (
            <SidebarItem
              key={index}
              name={option.name}
              // if this is our current selected option, pass down true inside of sidebar item
              active={index === selectedOptionIndex}
              handleClick={() => setSelectedOptionIndex(index)}
            />
          )
        })}
      </div>

      <Slider
        min={selectedOption.range.min}
        max={selectedOption.range.max}
        value={selectedOption.value}
        handleChange={handleSliderChange}
      />

    </div>
  )
}

export default App;