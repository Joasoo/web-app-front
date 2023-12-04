import { Loader } from '../loader/Loader'
import './friend-requests.scss'

export type RequestsPopUpProps = {
    loading: boolean
}

export const RequestsPopUp = (props: RequestsPopUpProps) => {
    return (
        <div className={'pop-up'}>
            <h6>Friend Requests</h6>
            <hr className={'color-text-1'} />
            <div>
                {props.loading ? (
                    <Loader className={'mx-auto'} size={'5em'} />
                ) : (
                    <>
                        <div>Donald Trump</div>
                        <div>Donald Trump</div>
                        <div>Donald Trump</div>
                    </>
                )}
            </div>
        </div>
    )
}
