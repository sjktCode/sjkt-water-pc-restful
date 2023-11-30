import { gql } from '@apollo/client';

export const GET_TEACHERS = gql`
    query getTeachers($page: PageInput!, $name: String) {
        getTeachers(page: $page, name: $name) {
            code
            message
            page {
                pageNum
                pageSize
                total
            }
            data {
                id
                name
                photoUrl
                teacherTime
                education
                seniority
                experience
                carryPrize
                tags
            }
        }
    }
`;

export const COMMIT_TEACHER = gql`
    mutation commitTeacherInfo($id: String!, $params: TeacherInput!) {
        commitTeacherInfo(id: $id, params: $params) {
            code
            message
        }
    }
`;

export const QUERY_TEACHER = gql`
    query getTeacherInfo($id: String!) {
        getTeacherInfo(id: $id) {
            code
            message
            data {
                id
                name
                photoUrl
                teacherTime
                education
                seniority
                experience
                carryPrize
                tags
            }
        }
    }
`;

export const DELETE_TEACHER = gql`
    mutation deleteTeacher($id: String!) {
        deleteTeacher(id: $id) {
            code
            message
        }
    }
`;
