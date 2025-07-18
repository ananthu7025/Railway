"use client";
import React from "react";
import { X } from "lucide-react";
import TrainInfoSearch from "@/components/LiveStation";

const TrainInfoDrawer = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Background overlay */}
      <div
        className={`fixed inset-0  bg-opacity-50 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer content */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[300px] bg-yellow-100 text-black shadow-2xl p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-yellow-800">🚆 Know Your Train</h2>
          <button
            className="text-yellow-700 hover:text-black"
            onClick={onClose}
          >
            <X size={24} />
          </button>
        </div>
        <TrainInfoSearch />
      </div>
    </div>
  );
};

export default TrainInfoDrawer;
