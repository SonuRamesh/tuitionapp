const express = require('express'); 
const z = require("zod");
const studentSchema = require("../models/student.model");

const studentRegister = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.number().min(10),
    designation: z.string(),
    bankname: z.string(),
    UPItransactionid: z.number().min(12),
  })

  const studentLogin =  async (req, res) => {
    try {
      const studentData = studentRegister.safeParse(req.body);
  
      const existingStudent = await studentSchema.findOne({ email: studentData.email });
      const existingPhone = await studentSchema.findOne({ phone: studentData.phone });
      const existingUPItransactionid = await studentSchema.findOne({ UPItransactionid: studentData.UPItransactionid });
      
      if (existingPhone) {
        throw new Error("This phone number is already taken");
      }
      if (existingUPItransactionid) {
        throw new Error("This UPItransactionid is already taken");
      }
      if (existingStudent) {
        throw new Error("This email is already taken");
      }
  
      const { name, email, phone, designation, bankname, UPItransactionid } = studentData;
  
      const createStudent = await studentSchema.create({
        name,
        email,
        phone,
        designation,
        bankname,
        UPItransactionid,
      });
  
      await createStudent.save();
      res.status(200).json({ message: "User registered successfully" });
  
    } catch (error) {
      console.error(error);
      res.status(404).json({ message: "Failed to register" });
    }
  };

  const getStudentLogin = async (req, res) => {
    try {
      const allStudents = await Student.find(); 
      res.status(200).json({ students: allStudents, message: "Data retrieved successfully" });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to retrieve students data" });
    }
  };

  
  module.exports = {
    studentLogin,
    getStudentLogin
  };



