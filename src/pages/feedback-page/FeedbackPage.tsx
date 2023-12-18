import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InputButton } from '../../components/button/InputButton'
import { Card } from '../../components/card/Card'
import { FormRow } from '../../components/FormRow'
import { Input } from '../../components/input/Input'
import { useErrorHandler } from '../../hooks/useErrorHandler'
import { useFetch } from '../../hooks/useFetch'
import { FeedbackModel } from '../../model/feedback.model'
import { PATH_FEEDBACK } from '../../util/RequestConstants'
import { ROUTE_LOGIN } from '../../util/RouteConstants'
import './feedback-page.scss'

export type FeedbackPageProps = {}

export const FeedbackPage = (props: FeedbackPageProps) => {
    const [userExperience, setUserExperience] = useState<string>('')
    const [comment, setComment] = useState<string>('')
    const { postJson } = useFetch()
    const { handleError } = useErrorHandler()
    const navigate = useNavigate()

    function submit() {
        const feedback: FeedbackModel = {
            rating: Number(userExperience),
            comment,
        }

        postJson(PATH_FEEDBACK, feedback)
            .then(() => {
                navigate(ROUTE_LOGIN)
            })
            .catch((err) => {
                handleError(err)
            })
    }

    return (
        <div className={'feedback'}>
            <Card className={'feedback-card'}>
                <h3 className={'mx-auto fit-content mt-2'}>Give feedback</h3>
                <FormRow className={'mt-5 d-flex flex-row justify-content-between mx-2'}>
                    <div className={'text-required fw-bold'}>User Experience rating (1 - 5):</div>
                    <Input
                        type={'integer'}
                        value={userExperience}
                        onChange={(val) => {
                            const num = Number(val)
                            if ((0 <= num && num <= 5) || val === undefined) {
                                setUserExperience(val)
                            }
                        }}
                    />
                </FormRow>
                <FormRow className={'mt-5 d-flex flex-row justify-content-between mx-2'}>
                    <div className={'me-2 fw-bold'}>Comment:</div>
                    <textarea
                        className={'text-comment rounded-2 bg-secondary-subtle'}
                        value={comment}
                        onChange={(e) => {
                            setComment(e.target.value)
                        }}
                    />
                </FormRow>
                <div
                    className={
                        'w-90 position-absolute bottom-0 left-0 my-3 d-flex align-items-center justify-content-center'
                    }
                >
                    <InputButton type={'info'} label={'Submit'} onClick={submit} />
                </div>
            </Card>
        </div>
    )
}
