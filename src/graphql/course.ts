import { gql } from '@apollo/client';

import axios from '@/utils/axios';

export const GET_COURSES = gql`
    query getCourses($page: PageInput!, $name: String) {
        getCourses(page: $page, name: $name) {
            code
            message
            page {
                total
                pageNum
                pageSize
            }
            data {
                id
                name
                limitNumber
                duration
            }
        }
    }
`;

export const getCourses = (pageNum: number, pageSize: number, name?: string) => {
    let requestUrl = `/course?page=${pageNum}&limit=${pageSize}`;
    if (name) {
        requestUrl += `&name=${name}`;
    }
    return axios.get(requestUrl);
};

export const COMMIT_COURSE = gql`
    mutation commitCourseInfo($params: PartialCourseInput!, $id: String) {
        commitCourseInfo(params: $params, id: $id) {
            code
            message
        }
    }
`;

export const GET_COURSE = gql`
    query getCourseInfo($id: String!) {
        getCourseInfo(id: $id) {
            code
            message
            data {
                id
                name
                desc
                group
                coverUrl
                baseAbility
                limitNumber
                duration
                reserveInfo
                refundInfo
                otherInfo
                teachers {
                    id
                    name
                    photoUrl
                }
                reducibleTime {
                    week
                    orderTime {
                        startTime
                        endTime
                        key
                    }
                }
            }
        }
    }
`;
