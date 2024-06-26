import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({periodoLisJSON,listadoColumnas,backgroundColor,borderColor,titulo}) => {
    return( 
        <>
            {listadoColumnas.length > 0 && (
                <Bar
                    data={{
                        labels: listadoColumnas,
                        datasets: [{
                            label: titulo,
                            data: periodoLisJSON,
                            backgroundColor: backgroundColor,
                            borderColor: borderColor,
                            borderWidth: 1
                        }],
                    }}
                    height={400}
                    width={1200}
                    options={{ 
                        maintainAspectRatio: false,
                        scale: {
                            ticks: {
                              precision: 0
                            }
                          }
                    }}
                />
            )}
        </>
    );
};

export default BarChart;
