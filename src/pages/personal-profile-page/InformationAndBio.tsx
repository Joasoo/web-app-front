import { Card } from '../../components/card/Card'
import { formatDateString } from '../../util/StringUtil'
import { ReactNode } from 'react'
import { FormRow } from '../../components/FormRow'

type InformationAndBioProps = {
    residence: string | undefined,
    hometown: string | undefined,
    workplace: string | undefined,
    dateOfBirth: string | undefined,
    bio: string | undefined,
}

export const InformationAndBio = (data: InformationAndBioProps) => {

    function getFormRow(text: ReactNode) {
        return <FormRow className={'my-1'}>{text}</FormRow>
    }

    return (
        <div className={'container'}>
            <div className={'row my-5'}>
                <div className={'col-5'}>
                    <Card className={'text-break p-4'}>
                        <h4>Information</h4>
                        <hr />
                        {data?.residence
                            ? getFormRow(
                                <>
                                    <b className={'me-2'}>Residence:</b> {data.residence}
                                </>,
                            )
                            : ''}
                        {data?.hometown
                            ? getFormRow(
                                <>
                                    <b className={'me-2'}>Hometown:</b> {data.hometown}
                                </>,
                            )
                            : ''}
                        {data?.workplace
                            ? getFormRow(
                                <>
                                    <b className={'me-2'}>Workplace:</b> {data.workplace}
                                </>,
                            )
                            : ''}
                        {data?.dateOfBirth
                            ? getFormRow(
                                <>
                                    <b className={'me-2'}>Birthday:</b>{' '}
                                    {formatDateString(data.dateOfBirth)}
                                </>,
                            )
                            : ''}
                    </Card>
                </div>

                <div className={'col'} />
                {/* For empty space between Information and Bio */}

                <div className={'col-5'}>
                    <Card className={'p-4 text-break'}>
                        <h4>Bio</h4>
                        <hr />
                        {data?.bio ?? undefined}
                    </Card>
                </div>
            </div>
        </div>
    )
}