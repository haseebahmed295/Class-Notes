<script>
import axios from 'axios';

async function getmenuitems() {
    try {
        const response = await axios.get('http://127.0.0.1:8000/menu-items'); // Replace with your API URL
        return response.data;
    } catch (error) {
        console.error('Failed to fetch menu items');
    }
}

async function getSubjectlist() {
    const response = await getmenuitems();
    // console.log('Backend Response:', response);

    // Process the array response and extract subjects
    const subjects =
        response.length > 0 && response[0].items
            ? response[0].items.map((item) => ({
                  name: item.label,
                  code: item.label
              }))
            : [];

    // console.log('Extracted Subjects:', subjects);
    return subjects;
}

async function addLecture(label, subject) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/lectures/add', {
            label: label.value,
            subject: subject.value.code
        });
        return response.data;
    } catch (error) {
        console.error('Failed to add lecture:', error);
    }
}
async function addSubject(Label) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/subjects/add', {
            label: Label.value
        });
        return response.data;
    } catch (error) {
        console.error('Failed to add subject:');
    }
}

async function addLectureData(subject, lecture, page, data) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/lectures/data/add', {
            subject: subject,
            lecture: lecture,
            page: page,
            data: data
        });
        return response.data;
    } catch (error) {
        console.error('Failed to add Lecture Data');
    }
}
async function getLectureData(subject, lecture) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/lectures/data/get', {
            subject,
            lecture
        });

        if (response.data.error) {
            console.log('Failed to get Lecture Data');
            return [];
        }

        // Ensure the response is mapped correctly
        const data = Array.isArray(response.data) ? response.data : [];

        // Map the response to extract `data` and wrap it in the expected format
        return data.map((item) => ({
            content: item.data || ''
        }));
    } catch (error) {
        console.error('Failed to get Lecture Data');
        return [];
    }
}
const checkLoginStatus = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
        return false;
    }

    try {
        const response = await axios.post('http://127.0.0.1:8000/user/auth', { token });
        if (!response.data.isValid) {
            if (response.data.error) {
                localStorage.removeItem('access_token');
            }
        }
        return response.data.isValid;
    } catch (error) {
        console.error('Token validation failed');
        return false;
    }
};

export { addLecture, addLectureData, addSubject, checkLoginStatus, getLectureData, getmenuitems, getSubjectlist };
</script>
