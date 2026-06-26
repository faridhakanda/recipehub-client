import React from "react";
import { TextField, InputGroup, Select, ListBox, Checkbox } from "@heroui/react";
import { Magnifier, ChevronDown } from "@gravity-ui/icons";

const RecipeFilter = ({ 
  searchQuery, 
  setSearchQuery, 

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
            <span className="text-sm font-medium text-zinc-100 block mb-2">Search Recipe</span>
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
        </div>

        
      
      </div>
    </div>
  );
}

export default RecipeFilter;