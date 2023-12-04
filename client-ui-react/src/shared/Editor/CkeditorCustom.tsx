import React, {FC} from 'react';
// @ts-ignore
import {CKEditor} from '@ckeditor/ckeditor5-react';
// @ts-ignore
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {imageCompressor} from "../../common/imageCompressor";
import {estateUploadFileApi} from "../../apis/Property";

export interface CkeditorSwannProps {
    children?: any;
    style?: string;
    data: string;
    onChange: (data: any) => void;
}

function UploadAdapter(loader: any) {
    return {
        upload() {
            return loader.file
                .then((file: any) => {
                    return new Promise(async (resolve, reject) => {
                        const formData = new FormData();
                        formData.append('original_image', file);
                        formData.append('compressed_image', await imageCompressor(file));
                        estateUploadFileApi(formData)
                            .then((response: any) => {
                                resolve({default: import.meta.env.VITE_APP_ESTATE_PUBLIC_URL + response?.data?.compressed_image?.fileModifiedName});
                            })
                            .catch((error: any) => {
                                reject(error);
                            });
                    });
                });
        }
    };
}

function UploadAdapterPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
        return UploadAdapter(loader)
    }
}

const CkeditorCustom: FC<CkeditorSwannProps> = ({onChange, data}) => {
    return (
        <CKEditor
            editor={ClassicEditor}
            data={data}
            config={{
                extraPlugins: [UploadAdapterPlugin],
                heading: {
                    options: [
                        {
                            model: 'paragraph',
                            title: 'Paragraph',
                            class: 'ck-heading_paragraph'
                        },
                        {
                            model: 'heading1',
                            view: {
                                name: 'h1',
                                classes: 'text-6xl',
                            },
                            title: 'Heading 1',
                            class: 'ck-heading_heading1',
                            converterPriority: 'high'
                        },
                        {
                            model: 'heading2',
                            view: {
                                name: 'h2',
                                classes: 'text-5xl',
                            },
                            title: 'Heading 2',
                            class: 'ck-heading_heading2',
                            converterPriority: 'high'
                        },
                        {
                            model: 'heading3',
                            view: {
                                name: 'h3',
                                classes: 'text-4xl',
                            },
                            title: 'Heading 3',
                            class: 'ck-heading_heading3',
                            converterPriority: 'high'
                        },
                        {
                            model: 'heading4',
                            view: {
                                name: 'h4',
                                classes: 'text-2xl',
                            },
                            title: 'Heading 4',
                            class: 'ck-heading_heading4',
                            converterPriority: 'high'
                        }
                    ]
                },
                image: {
                    // Configure the available styles.
                    styles: [
                        'alignLeft', 'alignCenter', 'alignRight', 'resizeImage'
                    ],

                    // Configure the available image resize options.
                    resizeOptions: [
                        {
                            name: 'resizeImage:original',
                            label: 'Original',
                            value: null
                        },
                        {
                            name: 'resizeImage:25',
                            value: '25',
                            icon: 'small'
                        },
                        {
                            name: 'resizeImage:50',
                            label: '50%',
                            value: '50'
                        },
                        {
                            name: 'resizeImage:75',
                            label: '75%',
                            value: '75'
                        }
                    ],

                    // You need to configure the image toolbar, too, so it shows the new style
                    // buttons as well as the resize buttons.
                    toolbar: [
                        'resizeImage:25', 'resizeImage:50', 'resizeImage:75', 'resizeImage:original', 'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
                        '|',
                        'resizeImage',
                        '|',
                        'imageTextAlternative'
                    ]
                },
                table: {
                    contentToolbar: [
                        'tableColumn',
                        'tableRow',
                        'mergeTableCells'
                    ],
                    tableProperties: [
                        'borderCollapse',
                        'borderSpacing'
                    ],
                    tableCell: [
                        'tableCellProperties',
                        'backgroundColor'
                    ],
                    tableCaption: [
                        'tableCaptionProperties'
                    ],
                    tableHeader: [
                        'tableHeaderProperties',
                        'backgroundColor'
                    ],
                    tableRow: [
                        'tableRowProperties',
                        'backgroundColor'
                    ],
                    tableColumn: [
                        'tableColumnProperties',
                        'backgroundColor'
                    ],
                    mergeTableCells: {
                        mergeRight: 'Merge right',
                        mergeDown: 'Merge down'
                    },
                    styles: [
                        'tableFullWidth',
                        'tableHeader',
                        'tableRow',
                        'tableCell',
                        'tableAlignCenter',
                        'tableAlignRight',
                        'tableAlignLeft',
                        'tableVerticalAlignMiddle',
                        'tableVerticalAlignBottom',
                        'tableVerticalAlignTop'
                    ],
                    alignment: [
                        'left',
                        'center',
                        'right'
                    ],
                    verticalAlignment: [
                        'top',
                        'middle',
                        'bottom'
                    ],
                    backgroundColor: [
                        '#ffffff',
                        '#000000',
                        '#f7f7f7',
                        '#cccccc',
                        '#c0c0c0',
                        '#999999',
                        '#666666',
                        '#333333',
                        '#ffff00',
                        '#ffcc00',
                        '#ff9900',
                        '#ff0000',
                        '#00ffff',
                        '#00ff00',
                        '#00cc00',
                        '#009900',
                        '#006600',
                        '#003300',
                        '#ffffff',
                        '#000000',
                        '#f7f7f7',
                        '#cccccc',
                        '#c0c0c0',
                        '#999999',
                        '#666666',
                        '#333333',
                        '#ffff00',
                        '#ffcc00',
                        '#ff9900',
                        '#ff0000',
                        '#00ffff',
                        '#00ff00'
                    ],
                    borderColor: [
                        '#ffffff',
                        '#000000',
                        '#f7f7f7',
                        '#cccccc',
                        '#c0c0c0',
                        '#999999',
                        '#666666',
                        '#333333',
                        '#ffff00',
                        '#ffcc00',
                        '#ff9900',
                        '#ff0000',
                        '#00ffff',
                        '#00ff00',
                        '#00cc00',
                        '#009900',
                        '#006600',
                        '#003300',
                        '#ffffff',
                        '#000000',
                        '#f7f7f7',
                        '#cccccc',
                        '#c0c0c0',
                        '#999999',
                        '#666666',
                        '#333333',
                        '#ffff00',
                        '#ffcc00',
                        '#ff9900',
                        '#ff0000',
                        '#00ffff',
                        '#00ff00'
                    ],
                    borderWidth: [
                        '0',
                        '1',
                        '2',
                        '3',
                        '4',
                        '5',
                        '6',
                        '7',
                        '8',
                        '9',
                        '10'
                    ],
                    borderStyle: [
                        'solid',
                        'dotted',
                        'dashed',
                        'double',
                        'groove',
                        'ridge',
                        'inset',
                        'outset'
                    ],
                    borderRadius: [
                        '0',
                        '1',
                        '2',
                        '3',
                        '4',
                        '5',
                        '6',
                        '7',
                        '8',
                        '9',
                        '10'
                    ]
                },
                link: {
                    decorators: [
                        {
                            mode: 'manual',
                            label: 'Add link',
                            key: 'link',
                            run: (editor: any) => {
                                const url = window.prompt('Enter a URL');
                                editor.model.change((writer: any) => {
                                    const image = editor.model.document.selection.getSelectedElement();
                                    writer.setAttribute('href', url, image);
                                });
                            }
                        }
                    ]
                }
            }}
            onReady={(editor: any) => {
                editor.editing.view.change((writer: any) => {
                    writer.setStyle(
                        'min-height',
                        '200px',
                        editor.editing.view.document.getRoot()
                    )
                })
                // You can store the "editor" and use when it is needed.
            }}
            onChange={(event: any, editor: { getData: () => any; }) => {
                onChange(editor.getData())
            }}
            // onBlur={ ( event: any, editor: any ) => {
            // //    This is called when the editor's options pressed
            // } }
            // onFocus={ ( event: any, editor: any ) => {
            // //    This is called when the editor is clicked
            // } }
        />
    );
};

export default CkeditorCustom;
