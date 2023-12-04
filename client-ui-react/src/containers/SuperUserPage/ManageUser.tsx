import React, {FC, useEffect, useState} from 'react';
import CommonLayout from '../AccountPage/CommonLayout';
import SwitchButton from '../../shared/SwitchButton/SwitchButton';
import {PencilIcon} from '@heroicons/react/outline';
import {getAllUsersAdminApi, updateUserAdminApi} from "../../apis/SuperAdmin";
import ModalCustom from "../../shared/Modal/ModalCustom";
import Input from "../../shared/Input/Input";
import FormItem from "../PageAddListing1/FormItem";
import Select from "../../shared/Select/Select";
import Textarea from "../../shared/Textarea/Textarea";
import {langType} from "../AccountPage/AccountPage";
import {getLanguagesApi} from "../../apis/StaticData";
import {toast} from "react-toastify"; // Import the pencil icon

const ManageUser: FC = () => {
    const [selectedUser, setSelectedUser] = useState<any>({});
    const [users, setUsers] = useState<any>([]);
    const [languages, setLanguages] = useState<langType[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {
        fetchLanguages();
        fetchAllUsers();
    }, []);

    const fetchAllUsers = () => {
        getAllUsersAdminApi()
            .then((response: any) => {
                setUsers(response.data)
            })
            .catch((error: any) => {
                console.error(error);
            });
    }

    const fetchLanguages = () => {
        getLanguagesApi()
            .then(response => {
                setLanguages(response.data);
            })
            .catch(error => {
                toast.error(error?.data?.message);
            });
    }

    const handleEdit = (userId: number) => {
        const userToEdit = users?.find((user: any) => user.id === userId);
        if (userToEdit) {
            setSelectedUser(userToEdit);
            setModalOpen(true);
        } else {
            toast.error('User not found please try again with reload');
        }
    };

    const onCloseModal = () => {
        setModalOpen(false);
    }

    const onUpdateUser = () => {
        let updatedUser = selectedUser;

        delete updatedUser?.email;
        delete updatedUser?.creationDate;
        delete updatedUser?.lastUpdateDate;
        delete updatedUser?.lastUpdatedBy;
        delete updatedUser?.roles;
        delete updatedUser?.searchCriteriaList;
        delete updatedUser?.userName;
        delete updatedUser?.userTypeEnum;

        updateUserAdminApi(updatedUser)
            .then((response: any) => {
                toast.success("User updated successfully");
                fetchAllUsers();
                setModalOpen(false);
            })
            .catch((error: any) => {
                toast.error(error?.response?.data?.message);
            });
    }

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedUser((prevState: any) => ({
            ...prevState,
            appUserDetails: {
                ...prevState?.appUserDetails,
                [event.target.name]: event.target.value
            }
        }));
    }

    return (
        <CommonLayout>
            <div className="overflow-x-auto">
                <ModalCustom
                    saveButtonLabel='Update'
                    open={modalOpen}
                    title="Edit User"
                    allowFooter={true}
                    onClose={onCloseModal}
                    onClickedClose={onCloseModal}
                    onClickedApply={onUpdateUser}
                >
                    <div className='grid grid-cols-2 gap-2 px-5'>
                        <FormItem label='First Name'>
                            <Input
                                id='firstName'
                                name='firstName'
                                type='text'
                                value={selectedUser?.appUserDetails?.firstName || ''}
                                onChange={onChangeHandler}
                            />
                        </FormItem>
                        <FormItem label='Last Name'>
                            <Input
                                id='lastName'
                                name='lastName'
                                type='text'
                                value={selectedUser?.appUserDetails?.lastName || ''}
                                onChange={onChangeHandler}
                            />
                        </FormItem>
                        <FormItem label='Gender'>
                            <Select
                                className="mt-1.5"
                                name='gender'
                                value={selectedUser?.appUserDetails?.gender || ''}
                                onChange={onChangeHandler}
                            >
                                <option value=''>Select</option>
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                                <option value="OTHER">Other</option>
                            </Select>
                        </FormItem>
                        <FormItem label='Phone Number'>
                            <Input
                                id='phoneNumber'
                                name='phoneNumber'
                                type='text'
                                value={selectedUser?.appUserDetails?.phoneNumber || ''}
                                onChange={onChangeHandler}
                            />
                        </FormItem>
                        <FormItem label='Facebook Link'>
                            <Input
                                id='facebookLink'
                                name='facebookLink'
                                type='text'
                                value={selectedUser?.appUserDetails?.facebookLink || ''}
                                onChange={onChangeHandler}
                            />
                        </FormItem>
                        <FormItem label='Twitter Link'>
                            <Input
                                id='twitterLink'
                                name='twitterLink'
                                type='text'
                                value={selectedUser?.appUserDetails?.twitterLink || ''}
                                onChange={onChangeHandler}
                            />
                        </FormItem>
                        <FormItem label='Youtube Link'>
                            <Input
                                id='youtubeLink'
                                name='youtubeLink'
                                type='text'
                                value={selectedUser?.appUserDetails?.youtubeLink || ''}
                                onChange={onChangeHandler}
                            />
                        </FormItem>
                        <FormItem label='Instagram Link'>
                            <Input
                                id='instagramLink'
                                name='instagramLink'
                                type='text'
                                value={selectedUser?.appUserDetails?.instagramLink || ''}
                                onChange={onChangeHandler}
                            />
                        </FormItem>
                        <FormItem label='Address'>
                            <Input
                                id='address'
                                name='address'
                                type='text'
                                value={selectedUser?.appUserDetails?.address || ''}
                                onChange={onChangeHandler}
                            />
                        </FormItem>
                        <FormItem label='Language'>
                            <Select
                                className="mt-1.5"
                                name='language'
                                value={selectedUser?.appUserDetails?.language || ''}
                                onChange={onChangeHandler}
                            >
                                <option disabled value=''>Select</option>
                                {languages?.map((language, index) => <option key={index}
                                                                             value={language.value}>{language.name}</option>)}
                            </Select>
                        </FormItem>
                        <FormItem label='Intro' className='col-span-2'>
                            <Textarea
                                className="mt-1.5"
                                name='intro'
                                value={selectedUser?.appUserDetails?.intro || ''}
                                onChange={onChangeHandler}
                            />
                        </FormItem>
                    </div>
                </ModalCustom>
                <table className="min-w-full bg-white border">
                    <thead className="bg-gray-200">
                    <tr>
                        <th className="py-3 px-6 text-left border-b">ID</th>
                        <th className="py-3 px-6 text-left border-b">First Name</th>
                        <th className="py-3 px-6 text-left border-b">Email</th>
                        <th className="py-3 px-6 text-left border-b">Active</th>
                        <th className="py-3 px-6 text-left border-b">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-700">
                    {
                        users?.map((user: any, index: number) => (
                            <tr key={index}>
                                <td className="py-3 px-6 border-b">{user.id}</td>
                                <td className="py-3 px-6 border-b">{user.appUserDetails.firstName}</td>
                                <td className="py-3 px-6 border-b">{user.email}</td>
                                <td className="py-3 px-6 border-b">
                                    <SwitchButton
                                        isActive={user.isActive}
                                        onChange={(isActive) => {
                                            user.isActive = isActive;
                                            updateUserAdminApi(user)
                                                .then((response: any) => {
                                                    toast.success("User updated successfully");
                                                    fetchAllUsers();
                                                })
                                                .catch((error: any) => {
                                                    toast.error(error?.response?.data?.message);
                                                });
                                        }}
                                    />
                                </td>
                                <td className="py-3 px-6 border-b">
                                    <button
                                        onClick={() => handleEdit(user.id)}
                                        className="text-blue-600 hover:text-blue-900"
                                    >
                                        <PencilIcon className="h-5 w-5"/>
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </CommonLayout>
    );
};

export default ManageUser;
