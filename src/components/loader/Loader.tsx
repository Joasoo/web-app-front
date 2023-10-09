import LoaderIcon from '../../img/temploader.svg'
import './loader.scss'

export type LoaderProps = {
    className?: string
    /*In overlay mode the loader takes up the whole screen and dims it.*/
    overlay?: boolean
    /*Default size: 8em*/
    size?: string
}

export const Loader = (props: LoaderProps) => {
    return (
        <div
            className={
                (props.overlay ? 'overlay ' : 'no-overlay ') +
                (props.className ?? '')
            }
        >
            <img
                src={LoaderIcon}
                className={props.overlay ? 'img-overlay' : ''}
                style={{ width: `${props.size ?? '8em'}` }}
            />
        </div>
    )
}
