import { verifyJwtToken } from "@/utils/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { deleteCookie, setCookie } from "cookies-next";
import { getCookies } from "cookies-next";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

axios.defaults.baseURL = baseURL;

axios.interceptors.request.use(async (config) => {
  try {
    const cookies = getCookies();
    const token = cookies.token;
    console.log("TOKEN", token);

    if (token) {
      const verifiedToken = await verifyJwtToken(token);
      if (verifiedToken) {
        config.headers.Authorization = `Bearer ${token}`;
        // dispatch(setUserId(verifiedToken.payload.id))
        // dispatch(setUserRole(verifiedToken.payload.roles))
      }
    }

    return config;
  } catch (error) {
    return Promise.reject(error);
  }
});

const authAdminLogin = createAsyncThunk(
  "authAdmin/authAdminLogin",
  async (data, { rejectWithValue }) => {
    try {
      const { email, password } = data;
      const response = await axios.post("/auth/admin/loginAdmin", data);
      const token = response.data.accessToken;
      setCookie("token", token, {
        httpOnly: false,
        secure: false,
        path: "/",
      });
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const authAdminRegister = createAsyncThunk(
  "authAdmin/authAdminRegister",
  async (data, { rejectWithValue }) => {
    try {
      const { email, password, name, adminInviteCode } = data;
      const response = await axios.post("/auth/admin/registerAdmin", data);
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const getAllUsers = createAsyncThunk(
  "getAllUsers/getAllUsers",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get("/admin/allUsers");
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const adminLogout = createAsyncThunk(
  "adminLogout/adminLogout",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get("/auth/admin/logoutAdmin");
      deleteCookie("token");
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const listAllLogs = createAsyncThunk(
  "listAllLogs/listAllLogs",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get("/admin/listAllLogs");
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);
const listAllPrismaLogs = createAsyncThunk(
  "listAllPrismaLogs/listAllPrismaLogs",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get("/admin/listPrismaLogs");
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);
const listAllDurationLogs = createAsyncThunk(
  "listAllDurationLogs/listAllDurationLogs",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get("/admin/listAllDurationLogs");
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const getAllSchools = createAsyncThunk(
  "getAllSchools/getAllSchools",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get("/admin/getAllSchools");
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const deleteAllLogs = createAsyncThunk(
  "deleteAllLogs/deleteAllLogs",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.delete("/admin/deleteAllLogs");
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const deleteAllPrismaLogs = createAsyncThunk(
  "deleteAllPrismaLogs/deleteAllPrismaLogs",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.delete("/admin/deleteAllPrismaLogs");
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const getAdminUserById = createAsyncThunk(
  "getAdminUserById/getAdminUserById",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/user/getUserById`);
      // localStorage.removeItem("accessToken");
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const updateUserProfile = createAsyncThunk(
  "updateUserProfile/updateUserProfile",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const { tcIdentity, city, birthDate, district, phoneNumber } = data;
      const response = await axios.put(`/user/updateUserProfile/${id}`, data);
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const createUserByAdmin = createAsyncThunk(
  "createUserByAdmin/createUserByAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const { name, email, password } = data;
      const response = await axios.post(`/admin/createUserByAdmin`, data);
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const authUserLogin = createAsyncThunk(
  "authUserLogin/authUserLogin",
  async (data, { rejectWithValue }) => {
    try {
      const { email, password } = data;
      const response = await axios.post("/auth/user/loginUser", data);
      const token = response.data.accessToken;
      setCookie("token", token, {
        httpOnly: false,
        secure: false,
        path: "/",
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authUserLogout = createAsyncThunk(
  "userLogout/userLogout",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get("/auth/user/logoutUser");
      deleteCookie("token");
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const getSchoolByOwnerId = createAsyncThunk(
  "getSchoolByOwnerId/getSchoolByOwnerId",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get("/school/getSchoolsByOwnerId");
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const createSchool = createAsyncThunk(
  "createSchool/createSchool",
  async (data, { rejectWithValue }) => {
    try {
      const { schoolName, schoolAddress, schoolPhone, schoolEmail } = data;
      const response = await axios.post(`/school/createSchool`, data);
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const getSchoolById = createAsyncThunk(
  "getSchoolById/getSchoolById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/school/getSchoolById/${id}`);
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const createSchoolStaff = createAsyncThunk(
  "createSchoolStaff/createSchoolStaff",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const { name, email, password, role, phoneNumber, subjectId } = data;
      const response = await axios.post(
        `/school/createSchoolStaff/${id}/staff`,
        data
      );
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const getClassesBySchoolId = createAsyncThunk(
  "getClassesBySchoolId/getClassesBySchoolId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/school/getClassesBySchoolId/${id}`);
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const createSchoolClass = createAsyncThunk(
  "createSchoolClass/createSchoolClass",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const { className, classDescription, classGradeLevel, forceCreate } =
        data;

      const payload = {
        className,
        classGradeLevel,
        forceCreate,
      };
      if (classDescription) {
        payload.classDescription = classDescription;
      }
      const response = await axios.post(
        `/school/createSchoolClass/${id}`,
        payload
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const getStudentsByClassId = createAsyncThunk(
  "getStudentsByClassId/getStudentsByClassId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/school/student/getStudentsByClassId/${id}`
      );
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const getTeachersByClassId = createAsyncThunk(
  "getTeachersByClassId/getTeachersByClassId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/school/teacher/getTeachersByClassId/${id}`);
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const getTeacherBySchoolId = createAsyncThunk(
  "getTeacherBySchoolId/getTeacherBySchoolId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/school/getTeacherBySchoolId/${id}`);
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const getDirectorsBySchoolId = createAsyncThunk(
  "getDirectorsBySchoolId/getDirectorsBySchoolId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/school/getDirectorsBySchoolId/${id}`);
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const addStudentToClass = createAsyncThunk(
  "addStudentToClass/addStudentToClass",
  async ({ schoolId, classId, data }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append("studentName", data.studentName);
      formData.append("studentSurname", data.studentSurname);
      formData.append("studentNumber", data.studentNumber);
      formData.append("studentBirthDate", data.studentBirthDate);
      formData.append("parentName", data.parentName);
      formData.append("parentSurname", data.parentSurname);
      formData.append("parentPhoneNumber", data.parentPhoneNumber);
      formData.append("parentRelationship", data.parentRelationship);
      formData.append("parentEmail", data.parentEmail);
      formData.append("parentAddress", data.parentAddress);
      formData.append("studentGender", data.studentGender);
      formData.append("parentJob", data.parentJob);

      const response = await axios.post(
        `/school/student/addStudentToClass/${schoolId}/${classId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const assignTeacherToClasses = createAsyncThunk(
  "assignTeacherToClasses/assignTeacherToClasses",
  async ({ teacherId, classId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/school/teacher/assignTeacherToClasses/${teacherId}/${classId}`
      );
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const getUnassignedTeachersForClass = createAsyncThunk(
  "getUnassignedTeachersForClass/getUnassignedTeachersForClass",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/school/getUnassignedTeachersForClass/${id}`
      );
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const updateSchool = createAsyncThunk(
  "updateSchool/updateSchool",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const { schoolName, schoolAddress, schoolPhone, schoolEmail } = data;
      const response = await axios.put(`/school/updateSchool/${id}`, data);
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const getSubjectsBySchoolId = createAsyncThunk(
  "getSubjectsBySchoolId/getSubjectsBySchoolId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/school/subject/getSubjectsBySchoolId/${id}`
      );
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const createSubject = createAsyncThunk(
  "createSubject/createSubject",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const { subjectName, subjectDescription } = data;
      const response = await axios.post(
        `/school/subject/createSubject/${id}`,
        data
      );
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const updateSubject = createAsyncThunk(
  "updateSubject/updateSubject",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const { subjectName, subjectDescription } = data;
      const response = await axios.put(
        `/school/subject/updateSubject/${id}`,
        data
      );
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const deleteSubject = createAsyncThunk(
  "deleteSubject/deleteSubject",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/school/subject/deleteSubject/${id}`
      );
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const getSubjectById = createAsyncThunk(
  "getSubjectById/getSubjectById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/school/subject/getSubjectById/${id}`);
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const getUnassignedTeachers = createAsyncThunk(
  "getUnassignedTeachers/getUnassignedTeachers",
  async (args, { rejectWithValue }) => {
    try {
      const response = await axios.get("/school/subject/getUnassignedTeachers");
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const assignSubjectsToTeacher = createAsyncThunk(
  "assignSubjectsToTeacher/assignSubjectsToTeacher",
  async ({ teacherId, subjectId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/school/subject/assignSubjectsToTeacher/${teacherId}/${subjectId}`
      );
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const getTeacherAssignedToSubject = createAsyncThunk(
  "getTeacherAssignedToSubject/getTeacherAssignedToSubject",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/school/subject/getTeacherAssignedToSubject/${id}`
      );
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const createClassSchedule = createAsyncThunk(
  "createClassSchedule/createClassSchedule",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const { scheduleEntries } = data;
      const response = await axios.post(`/school/createClassSchedule/${id}`, {
        scheduleEntries,
      });
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const getClassSchedule = createAsyncThunk(
  "getClassSchedule/getClassSchedule",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/school/getClassSchedule/${id}`);
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const getDirectorById = createAsyncThunk(
  "getDirectorById/getDirectorById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/school/director/getDirectorById/${id}`);
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const updateDirector = createAsyncThunk(
  "updateDirector/updateDirector",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const { name, email, password, phoneNumber, birthDate, city, district } =
        data;
      const response = await axios.put(`/school/director/updateDirector/${id}`, data);
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const deleteDirectorByOwnerId = createAsyncThunk(
  "deleteDirectorByOwnerId/deleteDirectorByOwnerId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/school/director/deleteDirectorByOwnerId/${id}`
      );
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const createSupportTicket = createAsyncThunk(
  "createSupportTicket/createSupportTicket",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/support/createSupportTicket/${id}`,
        data
      );
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const searchSchools = createAsyncThunk(
  "searchSchools/searchSchools",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/school/search/searchSchools?search=${searchQuery}`
      );
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const searchTeachers = createAsyncThunk(
  "searchTeachers/searchTeachers",
  async ({ searchQuery, id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/school/search/searchTeachers/${id}?search=${searchQuery}`
      );
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const searchDirectors = createAsyncThunk(
  "searchDirectors/searchDirectors",
  async ({ searchQuery, id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/school/search/searchDirectors/${id}?search=${searchQuery}`
      );
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const getTeacherById = createAsyncThunk(
  "getTeacherById/getTeacherById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/school/teacher/getTeacherById/${id}`);
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const updateTeacher = createAsyncThunk(
  "updateTeacher/updateTeacher",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const { name, email, phoneNumber, birthDate, city, district,newSubjectId } = data;
      const response = await axios.put(`/school/teacher/updateTeacher/${id}`, data);
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const deactiveTeacherById = createAsyncThunk(
  "deactiveTeacherById/deactiveTeacherById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/school/teacher/deactiveTeacherById/${id}`
      );
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const getStudentById = createAsyncThunk(
  "getStudentById/getStudentById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/school/student/getStudentById/${id}`);
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const updateStudent = createAsyncThunk(
  "updateStudent/updateStudent",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append("studentName", data.studentName);
      formData.append("studentSurname", data.studentSurname);
      formData.append("studentNumber", data.studentNumber);
      formData.append("studentBirthDate", data.studentBirthDate);
      formData.append("parentName", data.parentName);
      formData.append("parentSurname", data.parentSurname);
      formData.append("parentPhoneNumber", data.parentPhoneNumber);
      formData.append("parentRelationship", data.parentRelationship);
      formData.append("parentEmail", data.parentEmail);
      formData.append("parentAddress", data.parentAddress);
      formData.append("studentGender", data.studentGender);

      const response = await axios.put(
        `/school/student/updateStudent/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const deleteStudent = createAsyncThunk(
  "deleteStudent/deleteStudent",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/school/student/deleteStudent/${id}`
      );
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const getClassById = createAsyncThunk(
  "getClassById/getClassById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/school/getClassById/${id}`);
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const updateClass = createAsyncThunk(
  "updateClass/updateClass",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const { name, description, gradeLevel } = data;
      const response = await axios.put(`/school/updateClass/${id}`, data);
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const searchStudents = createAsyncThunk(
  "searchStudents/searchStudents",
  async ({ searchQuery, id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/school/search/searchStudents/${id}?search=${searchQuery}`
      );
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const searchClass = createAsyncThunk(
  "searchClass/searchClass",
  async ({ searchQuery, id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/school/search/searchClass/${id}?search=${searchQuery}`
      );
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const searchSubject = createAsyncThunk(
  "searchSubject/searchSubject",
  async ({ searchQuery, id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/school/search/searchSubject/${id}?search=${searchQuery}`
      );
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const searchTeacherClass = createAsyncThunk(
  "searchTeacherClass/searchTeacherClass",
  async ({ searchQuery, id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/school/search/searchTeacherClass/${id}?search=${searchQuery}`
      );
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const subjectTeacherSearch = createAsyncThunk(
  "subjectTeacherSearch/subjectTeacherSearch",
  async ({ searchQuery, id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/school/search/subjectTeacherSearch/${id}?search=${searchQuery}`
      );
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

const unassignedTeachersSearch = createAsyncThunk(
  "unassignedTeachersSearch/unassignedTeachersSearch",
  async ({ searchQuery, id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/school/search/unassignedTeachersSearch/${id}?search=${searchQuery}`
      );
      return response;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  }
);

export {
  authAdminLogin,
  authAdminRegister,
  getAllUsers,
  adminLogout,
  listAllLogs,
  getAdminUserById,
  updateUserProfile,
  createUserByAdmin,
  authUserLogin,
  deleteAllLogs,
  listAllPrismaLogs,
  deleteAllPrismaLogs,
  listAllDurationLogs,
  getSchoolByOwnerId,
  authUserLogout,
  createSchool,
  getAllSchools,
  getSchoolById,
  createSchoolStaff,
  getClassesBySchoolId,
  createSchoolClass,
  getStudentsByClassId,
  addStudentToClass,
  getTeachersByClassId,
  getTeacherBySchoolId,
  getDirectorsBySchoolId,
  assignTeacherToClasses,
  getUnassignedTeachersForClass,
  updateSchool,
  getSubjectsBySchoolId,
  createSubject,
  updateSubject,
  deleteSubject,
  getSubjectById,
  getUnassignedTeachers,
  assignSubjectsToTeacher,
  getTeacherAssignedToSubject,
  createClassSchedule,
  getClassSchedule,
  getDirectorById,
  updateDirector,
  deleteDirectorByOwnerId,
  createSupportTicket,
  searchSchools,
  searchTeachers,
  searchDirectors,
  getTeacherById,
  updateTeacher,
  updateStudent,
  getStudentById,
  deleteStudent,
  getClassById,
  updateClass,
  deactiveTeacherById,
  searchStudents,
  searchClass,
  searchSubject,
  searchTeacherClass,
  subjectTeacherSearch,
  unassignedTeachersSearch
};
