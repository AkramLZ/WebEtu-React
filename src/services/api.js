import axios from 'axios';

const API_URL = 'https://webetu.proxy.akraml.com/api';

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/authentication/v1/`, credentials);
        return {
            token: response.data.token,
            uuid: response.data.uuid
        };
    } catch (error) {
        throw new Error(error.response?.data || 'Unexpected error');
    }
};

export const getToken = () => {
    let token = localStorage.getItem('token');
    if (!token) {
        token = sessionStorage.getItem('token');
    }
    return token;
}

export const getUuid = () => {
    let uuid = localStorage.getItem('uuid');
    if (!uuid) {
        uuid = sessionStorage.getItem('uuid');
    }
    return uuid;
}

export const fetchIndividu = async () => {
    try {
        const uuid = getUuid();
        const token = getToken();

        const response = await axios.get(`${API_URL}/infos/bac/${uuid}/individu`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch individu');
    }
};

export const fetchAcademicYear = async () => {
    try {
        const token = getToken();

        const response = await axios.get(`${API_URL}/infos/AnneeAcademiqueEncours`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch academic year');
    }
}

export const fetchDias = async () => {
    try {
        const uuid = getUuid();
        const token = getToken();

        const response = await axios.get(`${API_URL}/infos/bac/${uuid}/dias`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch dias');
    }
}

export const fetchDia = async (year) => {
    try {
        const uuid = getUuid();
        const token = getToken();

        const response = await axios.get(`${API_URL}/infos/bac/${uuid}/anneeAcademique/${year}/dia`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch dia');
    }
};

export const fetchAssessments = async (diaId) => {
    try {
        const token = getToken();
        const response = await axios.get(`${API_URL}/infos/controleContinue/dia/${diaId}/notesCC`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch assessments");
    }
}

export const fetchExamGrades = async (diaId) => {
    try {
        const token = getToken();
        const response = await axios.get(`${API_URL}/infos/planningSession/dia/${diaId}/noteExamens`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch assessments");
    }
}

export const fetchGroups = async (diaId) => {
    try {
        const token = getToken();
        const response = await axios.get(`${API_URL}/infos/dia/${diaId}/groups`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch groups");
    }
};

export const fetchPeriods = async (niveauId) => {
    try {
        const token = getToken();
        const response = await axios.get(`${API_URL}/infos/niveau/${niveauId}/periodes`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });

        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch periods");
    }
}

export const fetchProfileImage = async () => {
    const token = localStorage.getItem("token");
    const uuid = localStorage.getItem("uuid");
    try {
        const response = await fetch(`${API_URL}/infos/image/${uuid}`, {
            headers: {
                'Authorization': token
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch image. Status: ${response.status}`);
        }

        return response.text();

    } catch (error) {
        console.error("API Error fetching profile image:", error);
        throw error;
    }
};