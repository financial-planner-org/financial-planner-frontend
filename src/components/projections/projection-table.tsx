'use client';

import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ProjectionTableProps {
    data: any[];
}

export function ProjectionTable({ data }: ProjectionTableProps) {
    return (
        <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Tabela de Projeção</h3>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Ano</TableHead>
                        <TableHead>Patrimônio Financeiro</TableHead>
                        <TableHead>Patrimônio Imobilizado</TableHead>
                        <TableHead>Total</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.year}</TableCell>
                            <TableCell>R$ {item.financial.toLocaleString()}</TableCell>
                            <TableCell>R$ {item.realEstate.toLocaleString()}</TableCell>
                            <TableCell>R$ {item.total.toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}
