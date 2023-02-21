import {get, post} from '../utils/axios'


export const filterCourse = async (params) => await get('/course/list', params)
export const filterTeacher = async (params) => await get('/teacher/list', params)
export const listRank = async (params) => await get('/rank/list',params)
export const deleteCourse = async (params) => await get('/course/delete',params)
export const downloadCourse = async (params) => await get('/course/download',params)
export const deleteTeacher = async (params) => await get('/teacher/delete',params)
export const addCourse = async (data) => await post('/course/add',data)
export const addTeacher = async (data) => await post('/teacher/add',data)
export const search = async (params) => await get('/complex/search',params)
export const getConfig = async () => await get('/config/get')
export const setConfig = async (data) => await post('/config/set',data)
export const getSite = async () => await get('/sites')
export const getUser = async () => await get('/users')
export const getDownloadClient = async () => await get('/download-client')
export const getChannel = async () => await get('/channel')
export const getMediaPath = async () => await get('/media-path')