import styles from './Error404.module.css'

export function Error404Component()
{
    
    return(
     <>
      <div className={styles.main}>
            <div className={styles.container}>
                <div>
                    <img className={styles.image} src="../../../../public/404 error with people holding the numbers.gif" alt="404 error" />
                </div>
            </div>
      </div>
    </>
    )
}