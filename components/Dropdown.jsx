import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";

import { API_BASE_URL } from "../service/Authentication/AuthService";
import { API_BASE_URL1 } from "../service/Authentication/AuthService";

    //API Endpoints
    const COMPANY_URL = `${API_BASE_URL}/api/Company`;
    const DEPARTMENT_URL = `${API_BASE_URL}/api/Department`;
    const LEAVE_TYPE_URL = `${API_BASE_URL}/api/LeaveType`;

    export const  CompaniesDropdown = ({ value, setValue, placeholder }) => {
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
            {value ? data.find((item) => item.companyID === value)?.name : placeholder}
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
                keyExtractor={(item) => (item?.companyID ? item.companyID.toString() : "unknown")}
                renderItem={({ item }) => (
                    <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => {
                        setValue(item.companyID); // Save the company ID, not the name
                        setIsOpen(false);
                    }}
                    >
                    <Text style={styles.itemText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                />
            )}
            </View>
        )}
        </View>
    );
    };

    export const DepartmentsDropdown = ({ value, setValue, placeholder }) => {
      const [isOpen, setIsOpen] = useState(false);
      const [data, setData] = useState([]);
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        axios
          .get(DEPARTMENT_URL)
          .then((response) => {
            console.log("Fetched Data:", response.data); // Debugging
            setData(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            setLoading(false);
          });
      }, []);
    
      return (
        <View style={styles.dropdownContainer}>
          {/* Dropdown Button */}
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setIsOpen(!isOpen)}
          >
            <Text style={styles.dropdownText}>
              {/* Display selected Department Name */}
              {value
                ? data.find((item) => item.departmentID === value)?.departmentName
                : placeholder}
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
                  keyExtractor={(item) =>
                    item?.departmentID ? item.departmentID.toString() : "unknown"
                  }
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
                  nestedScrollEnabled={true} // Enable nested scrolling for FlatList
                />
              )}
            </View>
          )}
        </View>
      );
    };

      export const  LeaveTypeDropdown = ({ value, setValue, placeholder }) => {
        const [isOpen, setIsOpen] = useState(false);
        const [data, setData] = useState([]);
        const [loading, setLoading] = useState(true);
      
        useEffect(() => {
          axios.get(LEAVE_TYPE_URL)
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
                {value ? data.find((item) => item.leaveTypeID === value)?.leaveTypeName : placeholder}
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
                    keyExtractor={(item) => (item?.leaveTypeID ? item.leaveTypeID.toString() : "unknown")}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => {
                          setValue(item.leaveTypeID); // Save the Department ID, not the name
                          setIsOpen(false);
                        }}
                      >
                        <Text style={styles.itemText}>{item.leaveTypeName}</Text>
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
    backgroundColor: "#fff",
  },
  dropdownButton: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 5,
    alignItems: "flex-start",
    justifyContent: "center"
  },
  dropdownIcon: {
    marginTop: 10,
    position: 'absolute',
    right: 10,
  },
  dropdownText: {
    fontSize: 16,
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


