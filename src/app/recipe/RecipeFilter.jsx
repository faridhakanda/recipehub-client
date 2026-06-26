import React from "react";
import {
  TextField,
  InputGroup,
  Select,
  ListBox,
  Checkbox,
} from "@heroui/react";
import { Magnifier, ChevronDown } from "@gravity-ui/icons";

const textInputClass =
  "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2.5 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition";
const selectBoxClass = "w-full flex flex-col gap-1";
const triggerClasses =
  "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg px-3 py-2.5 flex items-center justify-between outline-none data-[hover=true]:border-zinc-700";
const popoverClasses =
  "bg-zinc-950 border border-zinc-800 rounded-lg p-1 shadow-xl min-w-[200px]";
const listItemClasses =
  "text-zinc-300 px-3 py-2 rounded-md cursor-pointer hover:bg-zinc-900 hover:text-white outline-none data-[focused=true]:bg-zinc-900";
const textAreaClass =
  "w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg p-3 outline-none placeholder:text-zinc-600 focus:border-zinc-700 transition resize-none";

const RecipeFilter = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="flex flex-col gap-4 bg-zinc-900/50 p-6 rounded-[24px] border border-zinc-800/80 max-w-7xl mx-auto mb-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        {/* 1. Search Text Field - Span 5 columns */}
        <div className="md:col-span-5">
          <TextField
            value={searchQuery}
            onChange={(value) => setSearchQuery(value)}
            className="w-full"
            aria-label="Search recipes"
            label="Search Recipe"
            labelPlacement="outside"
          >
            <span className="text-sm font-medium text-zinc-100 block mb-2">
              Search Recipe
            </span>
            <InputGroup className="bg-zinc-800 border-zinc-700 focus-within:border-purple-500 rounded-xl transition-all w-full">
              <InputGroup.Prefix className="pl-3 text-white">
                <Magnifier className="w-4 h-4" />
              </InputGroup.Prefix>
              <InputGroup.Input
                placeholder="Recipe Name..."
                className="bg-transparent text-white placeholder-zinc-500 text-sm py-2.5 px-3 outline-none w-full"
              />
            </InputGroup>
          </TextField>

          {/* 3. Category Select Filter - Span 3 columns */}
          <div className="md:col-span-3">
            <span className="text-sm font-medium text-zinc-400 block mb-2">
              Category
            </span>
            <Select
              selectedKey={selectedCategory}
              onSelectionChange={(key) => setSelectedCategory(key)}
            >
              <Select.Trigger className="w-full flex items-center justify-between bg-zinc-800 text-white border border-zinc-700 hover:border-zinc-600 rounded-xl py-2.5 px-4 text-sm font-normal transition-all">
                <Select.Value>
                  {selectedCategory === ""
                    ? "All Categories"
                    : selectedCategory}
                </Select.Value>
                <Select.Indicator>
                  <ChevronDown className="w-4 h-4 text-zinc-400" />
                </Select.Indicator>
              </Select.Trigger>

              <Select.Popover className="bg-zinc-800 border border-zinc-700 rounded-xl shadow-xl mt-1 overflow-hidden z-50">
                <ListBox className="outline-none">
                  <ListBox.Item
                    label="all"
                    aria-label="search category"
                    labelPlacement="outside"
                    id="all"
                    className={listItemClasses}
                    textValue="AllCategory"
                  >
                    All Category
                  </ListBox.Item>
                  <ListBox.Item
                    label="appetizer"
                    aria-label="search category"
                    labelPlacement="outside"
                    id="appetizer"
                    className={listItemClasses}
                    textValue="Appetizer"
                  >
                    Appetizer
                  </ListBox.Item>
                  <ListBox.Item
                    label="main-course"
                    aria-label="search category"
                    labelPlacement="outside"
                    id="main-course"
                    className={listItemClasses}
                    textValue="Main Course"
                  >
                    Main Course
                  </ListBox.Item>
                  <ListBox.Item
                    label="dessert"
                    aria-label="search category"
                    labelPlacement="outside"
                    id="dessert"
                    className={listItemClasses}
                    textValue="Dessert"
                  >
                    Dessert
                  </ListBox.Item>
                  <ListBox.Item
                    label="breakfast"
                    aria-label="search category"
                    labelPlacement="outside"
                    id="breakfast"
                    className={listItemClasses}
                    textValue="Breakfast"
                  >
                    Breakfast
                  </ListBox.Item>
                  <ListBox.Item
                    label="lunch"
                    aria-label="search category"
                    labelPlacement="outside"
                    id="lunch"
                    className={listItemClasses}
                    textValue="Lunch"
                  >
                    Lunch
                  </ListBox.Item>
                  <ListBox.Item
                    label="dinner"
                    aria-label="search category"
                    labelPlacement="outside"
                    id="dinner"
                    className={listItemClasses}
                    textValue="Dinner"
                  >
                    Dinner
                  </ListBox.Item>
                  <ListBox.Item
                    label="snack"
                    aria-label="search category"
                    labelPlacement="outside"
                    id="snack"
                    className={listItemClasses}
                    textValue="Snack"
                  >
                    Snack
                  </ListBox.Item>
                  <ListBox.Item
                    label="soup"
                    aria-label="search category"
                    labelPlacement="outside"
                    id="soup"
                    className={listItemClasses}
                    textValue="Soup"
                  >
                    Soup
                  </ListBox.Item>
                  <ListBox.Item
                    label="salad"
                    aria-label="search category"
                    labelPlacement="outside"
                    id="salad"
                    className={listItemClasses}
                    textValue="Salad"
                  >
                    Salad
                  </ListBox.Item>
                  <ListBox.Item
                    label="beverage"
                    aria-label="search category"
                    labelPlacement="outside"
                    id="beverage"
                    className={listItemClasses}
                    textValue="Beverage"
                  >
                    Beverage
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeFilter;
