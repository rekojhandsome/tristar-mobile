import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, Modal } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";

import { URL } from "../service/Authentication/AuthenticationService";
    //API Endpoints
    const COMPANY_URL = `${URL}/api/Company/get-companies`;
    const DEPARTMENT_URL = `${URL}/api/Department/get-departments`
    const LEAVE_TYPE_URL = `${URL}/api/LeaveType`;
    const POSITION_URL = `${URL}/api/Position/get-positions`;

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
            {value ? data.find((item) => item.companyID === value)?.companyName : placeholder}
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
                    <Text style={styles.itemText}>{item.companyName}</Text>
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

      export const PositionsDropdown = ({ value, setValue, placeholder }) => {
      const [isOpen, setIsOpen] = useState(false);
      const [data, setData] = useState([]);
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        axios
          .get(POSITION_URL)
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
                ? data.find((item) => item.positionID === value)?.positionName
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
                    item?.positionID ? item.positionID.toString() : "unknown"
                  }
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() => {
                        setValue(item.positionID); // Save the Department ID, not the name
                        setIsOpen(false);
                      }}
                    >
                      <Text style={styles.itemText}>{item.positionName}</Text>
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

export const StaticDropdown = ({ data, value, setValue, placeholder, editable = true}) => {
const [isOpen, setIsOpen] = useState(false);
  return (
    <View style={styles.dropdownContainer}>
      {/* Dropdown Button */}
      <TouchableOpacity style={[styles.dropdownButton, !editable && styles.disabledButton]} onPress={() => editable && setIsOpen(!isOpen)}disabled={!editable}>
        <Text style={styles.dropdownText}>
          {value || placeholder} {/* Display selected value or placeholder */}
        </Text>
        <Ionicons name="chevron-down-outline" size={20} style={styles.dropdownIcon} />
      </TouchableOpacity>

      {/* Dropdown List */}
      {isOpen && (
        <View style={styles.dropdownList}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  setValue(item); // Set the selected value
                  setIsOpen(false); // Close the dropdown
                }}
              >
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export const LeaveStatusDropdown = ({ data, value, setValue, editable = true}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonLayout, setButtonLayout] = useState({ x: 0, y: 0 });
  const buttonRef = useRef();

  const openDropdown = () => {
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      setButtonLayout({ x, y: y + height }); // dropdown should appear below the button
      setIsOpen(true);
    });
  };

  return (
    <View ref={buttonRef} collapsable={false} style={leaveStatusStyles.dropdownContainer}>
      <TouchableOpacity
        style={[
          leaveStatusStyles.dropdownButton,
          !editable && leaveStatusStyles.disabledButton,
        ]}
        onPress={() => editable && openDropdown()}
        disabled={!editable}
      >
        <Text style={leaveStatusStyles.dropdownText}>
          {value || placeholder}
        </Text>
        <Ionicons
          name="chevron-down-outline"
          size={20}
          style={leaveStatusStyles.dropdownIcon}
        />
      </TouchableOpacity>

      <Modal visible={isOpen} transparent animationType="none">
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={() => setIsOpen(false)}
          style={StyleSheet.absoluteFill}
        >
          <View
            style={[
              leaveStatusStyles.floatingDropdown,
              {
                top: buttonLayout.y,
                left: buttonLayout.x,
              },
            ]}
          >
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={leaveStatusStyles.dropdownItem}
                  onPress={() => {
                    setValue(item);
                    setIsOpen(false);
                  }}
                >
                  <Text style={leaveStatusStyles.itemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const leaveStatusStyles = StyleSheet.create({
  dropdownContainer: {
    backgroundColor: "#fff",
    width: 105,
  },
  dropdownButton: {
    height: 30,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    justifyContent: "center",
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: "#f0f0f0",
    borderColor: "#ddd",
  },
  dropdownIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
    marginTop: -10,
  },
  dropdownText: {
    fontSize: 14,
  },
  floatingDropdown: {
    position: "absolute",
    width: 100,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    maxHeight: 200,
    elevation: 5,
    zIndex: 999,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemText: {
    fontSize: 14,
  },
});

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
  disabledButton:{
    backgroundColor: "#f0f0f0",
    borderColor: "#ddd",
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
    maxHeight: 300,
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


