import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

interface CustomAlertProps {
  visible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible = false,
  message = "",
  onConfirm,
  onCancel,
}) => {
  if (!visible) return null;

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View
        style={tw.style(
          "flex-1 justify-center items-center bg-black bg-opacity-50"
        )}
      >
        <View style={tw.style("bg-white p-6 rounded-lg w-4/5")}>
          <Text style={tw.style("text-lg font-semibold mb-4")}>{message}</Text>
          <View style={tw.style("flex-row justify-end space-x-2")}>
            <TouchableOpacity
              onPress={onCancel}
              style={tw.style("bg-blue-500 px-4 py-2 rounded mr-2")}
            >
              <Text style={tw.style("text-white")}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              style={tw.style("bg-red-500 px-4 py-2 rounded")}
            >
              <Text style={tw.style("text-white")}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;
