import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";

const COMPANY_URL = "http://192.168.29.207:5269/api/Department";

const  DepartmentsDropdown = ({ value, setValue, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(COMPANY_URL)
      .then(response => {
        console.log("Fetched Data:", response.data); // Debugging
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.dropdownContainer}>
      {/* Dropdown Button */}
      <TouchableOpacity style={styles.dropdownButton} onPress={() => setIsOpen(!isOpen)}>
        <Text style={styles.dropdownText}>
          {/* Display selected Company Name */}
          {value ? data.find((item) => item.departmentID === value)?.departmentName : placeholder}
        </Text>
        <Ionicons name="chevron-down-outline" size={25} style={styles.dropdownIcon} />
      </TouchableOpacity>

      {/* Dropdown List */}
      {isOpen && (
        <View style={styles.dropdownList}>
          {loading ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <FlatList
              data={data}
              keyExtractor={(item) => (item?.departmentID ? item.departmentID.toString() : "unknown")}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    setValue(item.departmentID); // Save the Department ID, not the name
                    setIsOpen(false);
                  }}
                >
                  <Text style={styles.itemText}>{item.departmentName}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  dropdownContainer: {
    marginVertical: 10,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 5,
  },
  dropdownIcon: {
    marginTop: 10,
    position: 'absolute',
    right: 10,
  },
  dropdownText: {
    fontSize: 14,
  },
  dropdownList: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    maxHeight: 150,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemText: {
    fontSize: 16,
  },
});

export default DepartmentsDropdown;
